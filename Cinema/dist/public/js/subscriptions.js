async function getSubscriptionForm(memberId){

    //remove the button action
    const subscribeButton = document.getElementById(`member_subscribe_button__${memberId}`)
    subscribeButton.onclick = null

    //write a function that gets an html form from : subscriptions/subscribe-form/:memberId"
    //and renders it in a new div appended to id "member_subscribe_button__memberId"
    
    const response = await fetch(`/subscriptions/subscribe-form/${memberId}`)
    const form_html = await response.text()
    const formDiv = document.createElement('div')
    formDiv.innerHTML = form_html
    subscribeButton.parentElement.appendChild(formDiv)
}