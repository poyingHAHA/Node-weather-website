console.log("Client side javascript file is loaded!");

// we use then method on the return value from fetch and we provide to it the callback function.
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => { // this function is going to run when the JSON data has arrived and been passed right here.
        console.log(data)
    })
})


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From JavaScript'



weatherForm.addEventListener('submit', (e) => {
    // The default behavior of forms is to completely reload the page. And that made sense a long time ago before we had access to good client side JS
    e.preventDefault() // preventDefault is going to prevent that default behavior, which is to refresh the browser
    
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = '' // Empty string to clear any value that might have existed from a previous search

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error
                console.log(data.error)
            }else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecastdata
            }
        })
    })

})