import {
    Chapter,
    ChapterDetails,
    ContentRating,
    HomeSection,
    HomeSectionType,
    LanguageCode,
    Manga,
    MangaStatus,
    MangaTile,
    PagedResults,
    SearchRequest,
    Source,
    SourceInfo,
} from "paperback-extensions-common";

const BAOZIMH_DOMAIN = 'https://baozimh.com'

export const BaozimhInfo: SourceInfo = {
    name: "包子漫画",
    description: "",
    icon: "icon.png",
    version: "1.3.2",
    author: "anotherSR | hanqinilnix",
    authorWebsite: "https://github.com/anotherSR",
    contentRating: ContentRating.EVERYONE,
    websiteBaseURL: BAOZIMH_DOMAIN,
    language: LanguageCode.CHINEESE,
};

export class Baozimh extends Source {
    requestManager = createRequestManager({
        requestsPerSecond:2, 
        requestTimeout:10000
    })

    async getMangaDetails(mangaId: string): Promise<Manga> {
        let request = createRequestObject({
            url: BAOZIMH_DOMAIN + mangaId,
            method: 'GET'
        })

        let response = await this.requestManager.schedule(request, 1)
        let $ = this.cheerio.load(response.data)

        let titles = [$('h1.comics-detail__title').text().trim()]
        let images = $('amp-img')
                .toArray()
                .map(element => $(element).attr('src'))
        let author = $('h2.comics-detail__author').text().trim()
        let desc = $('p.comics-detail__desc').text().trim()
        let tags = $('span.tag')
                .toArray()
                .map(element => $(element).text().trim())
        let status: MangaStatus
        switch (tags[0]) {
            case "连载中":
            status = MangaStatus.ONGOING
            break

            case "已完结":
            status = MangaStatus.COMPLETED
            break

            default:
            status = MangaStatus.UNKNOWN
        }
        let related = $('.recommend-comics > li > a')
                .toArray()
                .map(element => $(element).attr('href'))
                .slice(6)
                .map(element => element?.slice(7))

        return createManga({
            id: mangaId,
            titles: titles,
            status: status,
            langFlag: 'zh',
            image: (images[0] as string),
            author: author,
            covers: [(images[1] as string)],
            desc: desc,
            relatedIds: (related as string[]),
        });
    }

    async getChapters(mangaId: string): Promise<Chapter[]> {
        let request = createRequestObject({
            url: BAOZIMH_DOMAIN + mangaId,
            method: 'GET'
        })

        let response = await this.requestManager.schedule(request, 1)
        let $ = this.cheerio.load(response.data)

        let getChapterNumber = (link:string) => {
            let chapterNumber = ''
            console.log(link)
            
            let i = link.length - 1
            
            while (link[i] != '=') {
                chapterNumber = link[i] + chapterNumber
                i--
            }
            
            return +chapterNumber
        }
        
        let sections = $('.l-box > .pure-g').toArray().length
        let chapters
        
        if (sections == 1) {
            chapters = $('.l-box > .pure-g > div > a').toArray();
        } else {
            chapters = $('.l-box > .pure-g[id^=chapter] > div > a').toArray()
        }

        return chapters.map(element => {
            let link = $(element).attr('href')!.trim()

            return createChapter({
                id: link,
                mangaId: mangaId,
                chapNum: getChapterNumber(link),
                langCode: LanguageCode.CHINEESE,
                name: $(element).text().trim()
            })
        })
    }

    async getChapterDetails(mangaId: string, chapterId: string): Promise<ChapterDetails> {
        const comicId = chapterId.replace(/.*comic_id=/,'').replace(/&.*/,'');
        const sectionSolt = chapterId.replace(/.*section_slot=/,'').replace(/&.*/,'');
        const chapterSlot = chapterId.replace(/.*chapter_slot=/,'').replace(/&.*/,'')
        const descUrl = `https://www.webmota.com/comic/chapter/${comicId}/${sectionSolt}_${chapterSlot}.html`;

        // TODO: optimzie code and remove node-fetch
        // From:https://github.com/HaleyLeoZhang/node_puppeteer_framework/blob/master/es6/services/Comic/BaoZiService.js
        let image_list: Array<string> = [];
        const image_map: { [key:string]:number; } = {}; // 去重，这个渠道，图片翻页可能出现重复的

        let has_more = true;
        for (let i = 1; has_more; i++) {
            // list one
            let request = createRequestObject({
                url: descUrl.replace(".html", `_${i}.html`),
                method: 'GET',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; QQBrowser/7.0.3698.400)',
                }
            })
            
            const image_list_one_page = await await this.requestManager.schedule(request, 1)
                .then((res) => res.data)
                .then((html) => {
                    const image_list_temp = [];
                    const $1 = this.cheerio.load(html);
                    const image_object_list = $1(".comic-contain__item");
                    const image_length = image_object_list.length;
                    for (let i = 0; i < image_length; i++) {
                        const src = image_object_list.eq(i).attr("src");
                        image_list_temp.push(src);
                    }
                    return image_list_temp;
                });

            const len_one_page = image_list_one_page.length;
            const len_img = image_list.length;
            if (len_one_page === 0) {
                has_more = false;
                continue;
            } else if (len_img > 0 && (image_list_one_page[len_one_page - 1] === image_list[len_img - 1])) {
                // 如果最后一张图一样，说明已经到最后一页了
                has_more = false;
                continue;
            }
            // 处理翻页重复图片问题
            const image_list_raw : Array<string> = [];
            for (let j = 0; j < image_list_one_page.length; j++) {
                let img_key = image_list_one_page[j];
                img_key = img_key != undefined ? img_key : '';
                if (img_key.length == 0) {continue}
                if (image_map[img_key] === 1) {
                    // console.log("重复图，跳过")
                    continue;
                }
                image_map[img_key] = 1;
                image_list_raw.push(img_key);
            }

            // 合并内容
            image_list = image_list.concat(image_list_raw);
        }

        return createChapterDetails({
            id: chapterId,
            mangaId: mangaId,
            pages: image_list,
            longStrip: true
        })
        
    }

    async getSearchResults(query: SearchRequest, metadata: any): Promise<PagedResults> {
        let request = createRequestObject({
            url: BAOZIMH_DOMAIN + '/search?q=' + encodeURIComponent(query.title!),
            method: 'GET'
        })

        let response = await this.requestManager.schedule(request, 1)
        let $ = this.cheerio.load(response.data)

        let idLinks = $('div.comics-card > a.comics-card__info')
                .toArray()
                .map(e => $(e).attr('href')!.trim())

        let titles = $('.comics-card__title')
                        .toArray()
                        .map(e => $(e).text().trim())

        let imageLinks = $('div.comics-card > a.comics-card__poster > amp-img')
                .toArray()
                .map(e => $(e).attr('src')!.trim())

        if (idLinks.length == titles.length && titles.length == imageLinks.length) {
            let tiles : MangaTile[] =  []
            for (let i = 0; i < idLinks.length; i++) {
                tiles.push(createMangaTile({
                    id: idLinks[i] as string,
                    title: createIconText({text: titles[i] as string}),
                    image: imageLinks[i] as string
                }))
            }
            return createPagedResults({
                results: tiles
            })
        }

        throw new Error("Something wrong has occured!");
    }

    override getMangaShareUrl(mangaId: string): string {
        return BAOZIMH_DOMAIN + mangaId;
    }

    override async getHomePageSections(sectionCallback: (section: HomeSection) => void): Promise<void> {
        let request = createRequestObject({
            url: BAOZIMH_DOMAIN,
            method: 'GET'
        })
        
        let response = await this.requestManager.schedule(request, 1)
        let $ = this.cheerio.load(response.data)

        let hotSection = createHomeSection({
            id: "0",
            title: '热门漫画',
            view_more: true,
            type: HomeSectionType.featured,
        })
        sectionCallback(hotSection)
        hotSection.items = $('.index-rank > div > .comics-card').toArray()
            .map(manga => createMangaTile({
                id: $(manga).find('a').attr('href')!.trim(),
                title: createIconText({text: $(manga).find('a').attr('title')!.trim()}),
                image: $(manga).find('amp-img').attr('src')!.trim()
            }))
        sectionCallback(hotSection)

        let categories = $('.index-recommend-items').toArray()

        for (let id = 1; id < categories.length; id++) {
            let category = categories[id]
            let title = $(category).find('.catalog-title').text().trim()
            
            let section = createHomeSection({
                id: String(id),
                title: title,
                view_more: true,
            })
            sectionCallback(section)
            
            section.items = $(category)
                .find('.comics-card')
                .toArray()
                .map(manga => createMangaTile({
                    id: $(manga).find('a').attr('href')!.trim(),
                    title: createIconText({text: $(manga).find('a').attr('title')!.trim()}),
                    image: $(manga).find('amp-img').attr('src')!.trim()
                }))
            sectionCallback(section)
        }
    }

}
