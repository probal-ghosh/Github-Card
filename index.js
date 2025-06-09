const search = document.getElementById('search')
let paragraph = document.getElementById('paragraph')

search.addEventListener('click', collectData)
let errormessage = document.getElementById('error-message')

function collectData(){
    let name, image_url, location, bio, status, repo;
    let input = document.getElementById('input-div').value
    //console.log(username);

    const url_beta = 'https://api.github.com/users/'
    url = `${url_beta}${input}`
    console.log(url)


    fetch(url)
    .then((data)=>{
        return data.json()
    })
    .then((data)=>{
        console.log(data)
        name = data.name
        location = data.location
        bio = data.bio
        image_url  =  data.avatar_url
        console.log(name)
        status =  data.status
        repo = data.public_repos
        //document.getElementById('loader').style.display = 'none'
        //return name, bio,location, image_url;
    }
    )
    .then(()=>{
        const loader = document.getElementById('loader')
        const displayLoading = function(){
            loader.classList.add('display')
            console.log('display')
        }
        const hideLoading = function(){
            loader.classList.remove('display')
            console.log('hide')
        }
        // const alert_message = function(){
        //     window.alert('Invalid Username')
        // }
        // if(!input){
        //     window.alert('Pls enter the Username')
        // }
        if (status === '404') {
            console.log("Error")
            errormessage.innerText = 'Invalid Username'
            // displayLoading()
            // setTimeout(hideLoading, 2000)
            // const card = document.getElementById('card')
            // card.innerHTML = `
            // <P>Pls enter a valid Username</P>
            // `
            setTimeout(alert_message, 2000)
        }
        else{
            console.log('pass')
            errormessage.innerText = null
            const imageSection = document.getElementById('imageSection')
            const others = document.getElementById('others')
            const card = document.querySelector('.card')
            //paragraph.style.visibility = 'hidden'

            const dataShow = function(){
                card.innerHTML = `<div id="imageSection" style="border-bottom: 4px solid black; border-radius: 20px; display: flex; justify-content: center;"><img src="${image_url}" alt="Avatar" style="width: 75%; border-radius: 45px; padding: 15px;"></div>
                    <div id="others">
                        <h2 style="margin: 0; font-family: monospace; font-size: 1.8rem;">${name}</h2>
                        <p style="font-family: monospace; font-size: 1.2em;">${bio}</p>
                        <p style="font-family: monospace; font-size: 1.2em;">Repository: ${repo}</p>
                        <p style="font-family: monospace; font-size: 1.2em;">${location}</p>
                    </div> `
            }

            const dataFetch = function(){
                displayLoading()
                setTimeout(hideLoading, 2000)
                setTimeout(dataShow, 2000)
            }
            dataFetch()
        }
    }
    )
    .catch((error)=>{
        console.log(error)
        const others = document.getElementById('others')
        // others.innerHTML = `
        // <P>Some</P>
        // `
    })
}