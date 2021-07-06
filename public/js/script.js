const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message_1 = document.getElementById('message-1');
const message_2 = document.getElementById('message-2');

message_1.textContent='';
message_2.textContent='';

weatherForm.addEventListener('submit', e => {
    e.preventDefault();
    const city_name = search.value;
    message_1.textContent="Loading...";
    message_2.textContent='';

    fetch(`http://localhost:3000/weather?address=${city_name}`).then(result => {
        return result.json();
    } )
    .then(el => {
        if(el.error){
            message_1.textContent=el.error;
        }else{
            message_1.textContent = `${el.city} is a beautifull city of ${el.country} situated at latitude : ${el.latitude} , longitude : ${el.longitude} and the location : ${el.location}.`;
            message_2.textContent = `Today's Forecast max-temperature : ${el.maximum}, min-temperature : ${el.minium}, pressure : ${el.pressure}, wind speed : ${el.speed}, humidity : ${el.humidity} and ${el.details}.`;
        }
    })
    .catch(error => {
        message_2.textContent=`${error.error}`;
    })

})