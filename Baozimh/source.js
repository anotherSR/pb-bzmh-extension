(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Sources = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
/**
 * Request objects hold information for a particular source (see sources for example)
 * This allows us to to use a generic api to make the calls against any source
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlEncodeObject = exports.convertTime = exports.Source = void 0;
class Source {
    constructor(cheerio) {
        this.cheerio = cheerio;
    }
    /**
     * @deprecated use {@link Source.getSearchResults getSearchResults} instead
     */
    searchRequest(query, metadata) {
        return this.getSearchResults(query, metadata);
    }
    /**
     * @deprecated use {@link Source.getSearchTags} instead
     */
    async getTags() {
        // @ts-ignore
        return this.getSearchTags?.();
    }
}
exports.Source = Source;
// Many sites use '[x] time ago' - Figured it would be good to handle these cases in general
function convertTime(timeAgo) {
    let time;
    let trimmed = Number((/\d*/.exec(timeAgo) ?? [])[0]);
    trimmed = (trimmed == 0 && timeAgo.includes('a')) ? 1 : trimmed;
    if (timeAgo.includes('minutes')) {
        time = new Date(Date.now() - trimmed * 60000);
    }
    else if (timeAgo.includes('hours')) {
        time = new Date(Date.now() - trimmed * 3600000);
    }
    else if (timeAgo.includes('days')) {
        time = new Date(Date.now() - trimmed * 86400000);
    }
    else if (timeAgo.includes('year') || timeAgo.includes('years')) {
        time = new Date(Date.now() - trimmed * 31556952000);
    }
    else {
        time = new Date(Date.now());
    }
    return time;
}
exports.convertTime = convertTime;
/**
 * When a function requires a POST body, it always should be defined as a JsonObject
 * and then passed through this function to ensure that it's encoded properly.
 * @param obj
 */
function urlEncodeObject(obj) {
    let ret = {};
    for (const entry of Object.entries(obj)) {
        ret[encodeURIComponent(entry[0])] = encodeURIComponent(entry[1]);
    }
    return ret;
}
exports.urlEncodeObject = urlEncodeObject;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tracker = void 0;
class Tracker {
    constructor(cheerio) {
        this.cheerio = cheerio;
    }
}
exports.Tracker = Tracker;

},{}],3:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Source"), exports);
__exportStar(require("./Tracker"), exports);

},{"./Source":1,"./Tracker":2}],4:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./base"), exports);
__exportStar(require("./models"), exports);

},{"./base":3,"./models":47}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],6:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],7:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],8:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],9:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],10:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],11:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],12:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],13:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],14:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],15:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],16:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],17:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],18:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],19:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],20:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],21:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],22:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],23:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Button"), exports);
__exportStar(require("./Form"), exports);
__exportStar(require("./Header"), exports);
__exportStar(require("./InputField"), exports);
__exportStar(require("./Label"), exports);
__exportStar(require("./Link"), exports);
__exportStar(require("./MultilineLabel"), exports);
__exportStar(require("./NavigationButton"), exports);
__exportStar(require("./OAuthButton"), exports);
__exportStar(require("./Section"), exports);
__exportStar(require("./Select"), exports);
__exportStar(require("./Switch"), exports);
__exportStar(require("./WebViewButton"), exports);
__exportStar(require("./FormRow"), exports);
__exportStar(require("./Stepper"), exports);

},{"./Button":8,"./Form":9,"./FormRow":10,"./Header":11,"./InputField":12,"./Label":13,"./Link":14,"./MultilineLabel":15,"./NavigationButton":16,"./OAuthButton":17,"./Section":18,"./Select":19,"./Stepper":20,"./Switch":21,"./WebViewButton":22}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeSectionType = void 0;
var HomeSectionType;
(function (HomeSectionType) {
    HomeSectionType["singleRowNormal"] = "singleRowNormal";
    HomeSectionType["singleRowLarge"] = "singleRowLarge";
    HomeSectionType["doubleRow"] = "doubleRow";
    HomeSectionType["featured"] = "featured";
})(HomeSectionType = exports.HomeSectionType || (exports.HomeSectionType = {}));

},{}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageCode = void 0;
var LanguageCode;
(function (LanguageCode) {
    LanguageCode["UNKNOWN"] = "_unknown";
    LanguageCode["BENGALI"] = "bd";
    LanguageCode["BULGARIAN"] = "bg";
    LanguageCode["BRAZILIAN"] = "br";
    LanguageCode["CHINEESE"] = "cn";
    LanguageCode["CZECH"] = "cz";
    LanguageCode["GERMAN"] = "de";
    LanguageCode["DANISH"] = "dk";
    LanguageCode["ENGLISH"] = "gb";
    LanguageCode["SPANISH"] = "es";
    LanguageCode["FINNISH"] = "fi";
    LanguageCode["FRENCH"] = "fr";
    LanguageCode["WELSH"] = "gb";
    LanguageCode["GREEK"] = "gr";
    LanguageCode["CHINEESE_HONGKONG"] = "hk";
    LanguageCode["HUNGARIAN"] = "hu";
    LanguageCode["INDONESIAN"] = "id";
    LanguageCode["ISRELI"] = "il";
    LanguageCode["INDIAN"] = "in";
    LanguageCode["IRAN"] = "ir";
    LanguageCode["ITALIAN"] = "it";
    LanguageCode["JAPANESE"] = "jp";
    LanguageCode["KOREAN"] = "kr";
    LanguageCode["LITHUANIAN"] = "lt";
    LanguageCode["MONGOLIAN"] = "mn";
    LanguageCode["MEXIAN"] = "mx";
    LanguageCode["MALAY"] = "my";
    LanguageCode["DUTCH"] = "nl";
    LanguageCode["NORWEGIAN"] = "no";
    LanguageCode["PHILIPPINE"] = "ph";
    LanguageCode["POLISH"] = "pl";
    LanguageCode["PORTUGUESE"] = "pt";
    LanguageCode["ROMANIAN"] = "ro";
    LanguageCode["RUSSIAN"] = "ru";
    LanguageCode["SANSKRIT"] = "sa";
    LanguageCode["SAMI"] = "si";
    LanguageCode["THAI"] = "th";
    LanguageCode["TURKISH"] = "tr";
    LanguageCode["UKRAINIAN"] = "ua";
    LanguageCode["VIETNAMESE"] = "vn";
})(LanguageCode = exports.LanguageCode || (exports.LanguageCode = {}));

},{}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MangaStatus = void 0;
var MangaStatus;
(function (MangaStatus) {
    MangaStatus[MangaStatus["ONGOING"] = 1] = "ONGOING";
    MangaStatus[MangaStatus["COMPLETED"] = 0] = "COMPLETED";
    MangaStatus[MangaStatus["UNKNOWN"] = 2] = "UNKNOWN";
    MangaStatus[MangaStatus["ABANDONED"] = 3] = "ABANDONED";
    MangaStatus[MangaStatus["HIATUS"] = 4] = "HIATUS";
})(MangaStatus = exports.MangaStatus || (exports.MangaStatus = {}));

},{}],27:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],28:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],29:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],30:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],31:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],32:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],33:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],34:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],35:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],36:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],37:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchOperator = void 0;
var SearchOperator;
(function (SearchOperator) {
    SearchOperator["AND"] = "AND";
    SearchOperator["OR"] = "OR";
})(SearchOperator = exports.SearchOperator || (exports.SearchOperator = {}));

},{}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentRating = void 0;
/**
 * A content rating to be attributed to each source.
 */
var ContentRating;
(function (ContentRating) {
    ContentRating["EVERYONE"] = "EVERYONE";
    ContentRating["MATURE"] = "MATURE";
    ContentRating["ADULT"] = "ADULT";
})(ContentRating = exports.ContentRating || (exports.ContentRating = {}));

},{}],40:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],41:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagType = void 0;
/**
 * An enumerator which {@link SourceTags} uses to define the color of the tag rendered on the website.
 * Five types are available: blue, green, grey, yellow and red, the default one is blue.
 * Common colors are red for (Broken), yellow for (+18), grey for (Country-Proof)
 */
var TagType;
(function (TagType) {
    TagType["BLUE"] = "default";
    TagType["GREEN"] = "success";
    TagType["GREY"] = "info";
    TagType["YELLOW"] = "warning";
    TagType["RED"] = "danger";
})(TagType = exports.TagType || (exports.TagType = {}));

},{}],43:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],44:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],45:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],46:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],47:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Chapter"), exports);
__exportStar(require("./HomeSection"), exports);
__exportStar(require("./DynamicUI"), exports);
__exportStar(require("./ChapterDetails"), exports);
__exportStar(require("./Manga"), exports);
__exportStar(require("./MangaTile"), exports);
__exportStar(require("./RequestObject"), exports);
__exportStar(require("./SearchRequest"), exports);
__exportStar(require("./TagSection"), exports);
__exportStar(require("./SourceTag"), exports);
__exportStar(require("./Languages"), exports);
__exportStar(require("./Constants"), exports);
__exportStar(require("./MangaUpdate"), exports);
__exportStar(require("./PagedResults"), exports);
__exportStar(require("./ResponseObject"), exports);
__exportStar(require("./RequestManager"), exports);
__exportStar(require("./RequestHeaders"), exports);
__exportStar(require("./SourceInfo"), exports);
__exportStar(require("./SourceStateManager"), exports);
__exportStar(require("./RequestInterceptor"), exports);
__exportStar(require("./TrackedManga"), exports);
__exportStar(require("./SourceManga"), exports);
__exportStar(require("./TrackedMangaChapterReadAction"), exports);
__exportStar(require("./TrackerActionQueue"), exports);
__exportStar(require("./SearchField"), exports);
__exportStar(require("./RawData"), exports);
__exportStar(require("./SearchFilter"), exports);

},{"./Chapter":5,"./ChapterDetails":6,"./Constants":7,"./DynamicUI":23,"./HomeSection":24,"./Languages":25,"./Manga":26,"./MangaTile":27,"./MangaUpdate":28,"./PagedResults":29,"./RawData":30,"./RequestHeaders":31,"./RequestInterceptor":32,"./RequestManager":33,"./RequestObject":34,"./ResponseObject":35,"./SearchField":36,"./SearchFilter":37,"./SearchRequest":38,"./SourceInfo":39,"./SourceManga":40,"./SourceStateManager":41,"./SourceTag":42,"./TagSection":43,"./TrackedManga":44,"./TrackedMangaChapterReadAction":45,"./TrackerActionQueue":46}],48:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Baozimh = exports.BaozimhInfo = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
const BAOZIMH_DOMAIN = 'https://baozimh.com';
exports.BaozimhInfo = {
    name: "包子漫画",
    description: "",
    icon: "icon.png",
    version: "1.3.2",
    author: "anotherSR | hanqinilnix",
    authorWebsite: "https://github.com/anotherSR",
    contentRating: paperback_extensions_common_1.ContentRating.EVERYONE,
    websiteBaseURL: BAOZIMH_DOMAIN,
    language: paperback_extensions_common_1.LanguageCode.CHINEESE,
};
class Baozimh extends paperback_extensions_common_1.Source {
    constructor() {
        super(...arguments);
        this.requestManager = createRequestManager({
            requestsPerSecond: 2,
            requestTimeout: 10000
        });
    }
    async getMangaDetails(mangaId) {
        let request = createRequestObject({
            url: BAOZIMH_DOMAIN + mangaId,
            method: 'GET'
        });
        let response = await this.requestManager.schedule(request, 1);
        let $ = this.cheerio.load(response.data);
        let titles = [$('h1.comics-detail__title').text().trim()];
        let images = $('amp-img')
            .toArray()
            .map(element => $(element).attr('src'));
        let author = $('h2.comics-detail__author').text().trim();
        let desc = $('p.comics-detail__desc').text().trim();
        let tags = $('span.tag')
            .toArray()
            .map(element => $(element).text().trim());
        let status;
        switch (tags[0]) {
            case "连载中":
                status = paperback_extensions_common_1.MangaStatus.ONGOING;
                break;
            case "已完结":
                status = paperback_extensions_common_1.MangaStatus.COMPLETED;
                break;
            default:
                status = paperback_extensions_common_1.MangaStatus.UNKNOWN;
        }
        let related = $('.recommend-comics > li > a')
            .toArray()
            .map(element => $(element).attr('href'))
            .slice(6)
            .map(element => element?.slice(7));
        return createManga({
            id: mangaId,
            titles: titles,
            status: status,
            langFlag: 'zh',
            image: images[0],
            author: author,
            covers: [images[1]],
            desc: desc,
            relatedIds: related,
        });
    }
    async getChapters(mangaId) {
        let request = createRequestObject({
            url: BAOZIMH_DOMAIN + mangaId,
            method: 'GET'
        });
        let response = await this.requestManager.schedule(request, 1);
        let $ = this.cheerio.load(response.data);
        let getChapterNumber = (link) => {
            let chapterNumber = '';
            console.log(link);
            let i = link.length - 1;
            while (link[i] != '=') {
                chapterNumber = link[i] + chapterNumber;
                i--;
            }
            return +chapterNumber;
        };
        let sections = $('.l-box > .pure-g').toArray().length;
        let chapters;
        if (sections == 1) {
            chapters = $('.l-box > .pure-g > div > a').toArray();
        }
        else {
            chapters = $('.l-box > .pure-g[id^=chapter] > div > a').toArray();
        }
        return chapters.map(element => {
            let link = $(element).attr('href').trim();
            return createChapter({
                id: link,
                mangaId: mangaId,
                chapNum: getChapterNumber(link),
                langCode: paperback_extensions_common_1.LanguageCode.CHINEESE,
                name: $(element).text().trim()
            });
        });
    }
    async getChapterDetails(mangaId, chapterId) {
        const comicId = chapterId.replace(/.*comic_id=/, '').replace(/&.*/, '');
        const sectionSolt = chapterId.replace(/.*section_slot=/, '').replace(/&.*/, '');
        const chapterSlot = chapterId.replace(/.*chapter_slot=/, '').replace(/&.*/, '');
        const descUrl = `https://www.webmota.com/comic/chapter/${comicId}/${sectionSolt}_${chapterSlot}.html`;
        // TODO: optimzie code and remove node-fetch
        // From:https://github.com/HaleyLeoZhang/node_puppeteer_framework/blob/master/es6/services/Comic/BaoZiService.js
        let image_list = [];
        const image_map = {}; // 去重，这个渠道，图片翻页可能出现重复的
        let has_more = true;
        for (let i = 1; has_more; i++) {
            // list one
            let request = createRequestObject({
                url: descUrl.replace(".html", `_${i}.html`),
                method: 'GET',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; QQBrowser/7.0.3698.400)',
                }
            });
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
            }
            else if (len_img > 0 && (image_list_one_page[len_one_page - 1] === image_list[len_img - 1])) {
                // 如果最后一张图一样，说明已经到最后一页了
                has_more = false;
                continue;
            }
            // 处理翻页重复图片问题
            const image_list_raw = [];
            for (let j = 0; j < image_list_one_page.length; j++) {
                let img_key = image_list_one_page[j];
                img_key = img_key != undefined ? img_key : '';
                if (img_key.length == 0) {
                    continue;
                }
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
        });
    }
    async getSearchResults(query, metadata) {
        let request = createRequestObject({
            url: BAOZIMH_DOMAIN + '/search?q=' + encodeURIComponent(query.title),
            method: 'GET'
        });
        let response = await this.requestManager.schedule(request, 1);
        let $ = this.cheerio.load(response.data);
        let idLinks = $('div.comics-card > a.comics-card__info')
            .toArray()
            .map(e => $(e).attr('href').trim());
        let titles = $('.comics-card__title')
            .toArray()
            .map(e => $(e).text().trim());
        let imageLinks = $('div.comics-card > a.comics-card__poster > amp-img')
            .toArray()
            .map(e => $(e).attr('src').trim());
        if (idLinks.length == titles.length && titles.length == imageLinks.length) {
            let tiles = [];
            for (let i = 0; i < idLinks.length; i++) {
                tiles.push(createMangaTile({
                    id: idLinks[i],
                    title: createIconText({ text: titles[i] }),
                    image: imageLinks[i]
                }));
            }
            return createPagedResults({
                results: tiles
            });
        }
        throw new Error("Something wrong has occured!");
    }
    getMangaShareUrl(mangaId) {
        return BAOZIMH_DOMAIN + mangaId;
    }
    async getHomePageSections(sectionCallback) {
        let request = createRequestObject({
            url: BAOZIMH_DOMAIN,
            method: 'GET'
        });
        let response = await this.requestManager.schedule(request, 1);
        let $ = this.cheerio.load(response.data);
        let hotSection = createHomeSection({
            id: "0",
            title: '热门漫画',
            view_more: true,
            type: paperback_extensions_common_1.HomeSectionType.featured,
        });
        sectionCallback(hotSection);
        hotSection.items = $('.index-rank > div > .comics-card').toArray()
            .map(manga => createMangaTile({
            id: $(manga).find('a').attr('href').trim(),
            title: createIconText({ text: $(manga).find('a').attr('title').trim() }),
            image: $(manga).find('amp-img').attr('src').trim()
        }));
        sectionCallback(hotSection);
        let categories = $('.index-recommend-items').toArray();
        for (let id = 1; id < categories.length; id++) {
            let category = categories[id];
            let title = $(category).find('.catalog-title').text().trim();
            let section = createHomeSection({
                id: String(id),
                title: title,
                view_more: true,
            });
            sectionCallback(section);
            section.items = $(category)
                .find('.comics-card')
                .toArray()
                .map(manga => createMangaTile({
                id: $(manga).find('a').attr('href').trim(),
                title: createIconText({ text: $(manga).find('a').attr('title').trim() }),
                image: $(manga).find('amp-img').attr('src').trim()
            }));
            sectionCallback(section);
        }
    }
}
exports.Baozimh = Baozimh;

},{"paperback-extensions-common":4}]},{},[48])(48)
});
