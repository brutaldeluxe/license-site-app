const request = require('request')
const sort = require('sort-objects-array')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const url = 'https://www.spelinspektionen.se/licensansokan/bolag-med-spellicens/'

const parsepage1 = (callback) => {

    request({url: url}, (error, {body}) => {
        if(error){
            callback('Unable to connect to page: '+ error, undefined)
        }
        else if(body.error){
            callback('Something wrong with page: '+body.error, undefined)
        }
        else{
            callback(undefined, body)
        }
    })
}

const buildList = (result, callback) => {
    let dom = new JSDOM(result);

    let div = dom.window.document.querySelector(".main-body")
    let list = []
    const pattern = /\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0[1-9]|[12][0-9]|3[01])/g

    div.childNodes.forEach((element) => {
        if(element.textContent.match(/Uppdaterad/g)){
            lastUpdated = element.textContent.match(pattern)[0]
        }
        else if (element.tagName === 'HR'){
            let company = element.nextElementSibling.textContent
            element = element.nextElementSibling
            let dateString = element.nextElementSibling.textContent
            let dates = dateString.match(pattern)
            element = element.nextElementSibling
            let online = element.nextElementSibling.textContent.includes("online")
            element = element.nextElementSibling.nextElementSibling
            let sites = element.nextElementSibling.textContent
            if(online){
                list.push({
                    'company': company,
                    'license_date': dates[0],
                    'dates': dates,
                    'sites': sites
                })
            }
        }
    })
    list = sort(list, 'license_date', 'desc')
    callback(list)
}

module.exports = {
    parsepage1,
    buildList,
    url
}