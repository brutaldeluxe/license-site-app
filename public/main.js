const text = document.querySelector('#text')
const sites = document.querySelector('#sites')

fetch('/licensedcompanies').then((response) => {
    response.json().then((data) => {
        if(data.error){
            text.textContent = data.error
        }
        else {
            text.textContent = data.size + ' companies currently holds a license'
            data.list.forEach(item => {
                let div = document.createElement('div')
                let header = document.createElement('h2')
                let p1 = document.createElement('h3')
                let p2 = document.createElement('p')
                let name = document.createTextNode(item.company)
                let date = document.createTextNode(item.license_date)
                let siteList = document.createTextNode(item.sites)
                header.appendChild(name)
                sites.appendChild(div);
                div.appendChild(header);
                div.appendChild(p1);
                p1.appendChild(date)
                div.appendChild(p2);
                p2.appendChild(siteList)
                div.classList.add('company')
                p2.classList.add('siteList')
            })      
        }   
    })
})