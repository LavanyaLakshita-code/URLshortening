// Using fetch
// function postData() {
//     let url = document.getElementById('inputUrl').value;
//     // console.log(url);
//     fetch(`https://api.shrtco.de/v2/shorten?url=${url}`)
//         .then((response) => response.json())
//         .then((data) => {
//             document.getElementById('contentDiv').style.display = "flex";
//             document.getElementById("getUrl").innerHTML = data.result.short_link;
//         })
// }

// Using Axios
function postData() {
    let url = document.getElementById("inputUrl").value;
    console.log(url);
    axios.get(`https://api.shrtco.de/v2/shorten?url=${url}`)
        .then((response) => {
            console.log(response.data.result.short_link);
            document.getElementById('contentDiv').style.display = "flex";
            document.getElementById("getUrl").innerHTML = response.data.result.short_link;
        })
}


const copyContent = async () => {
    let text = document.getElementById('getUrl').innerHTML;
    console.log(text);
    try {
        await navigator.clipboard.writeText(text);
        var x = document.getElementById("button").innerHTML = "Copied";
        setTimeout(function () {
            const disable = document.querySelector('#button');
            disable.addEventListener('click', () => {
                disable.style.backgroundColor = "grey";
                disable.style.pointerEvents = "none";
                disable.disabled = true;
            });
        }, 0);
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}