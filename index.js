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
    // console.log(url);
    axios.get(`https://api.shrtco.de/v2/shorten?url=${url}`)
        .then((response) => {
            document.getElementById('contentDiv').style.display = "flex";
            document.getElementById("getUrl").innerHTML = response.data.result.short_link;
            document.getElementById('er-msg').style.display = "none";
            document.getElementById('dot').style.display = "none";
            document.getElementById("inputUrl").style.border = "none";
        }).catch(function (error) {
            if (error.response.data.error_code) {
                let err = error.response.data.error;
                if (err.length % 2 == 0 || err.length % 2 !== 0) {
                    let extract = err.slice(0, err.length / 2);
                    document.getElementById("er-msg").innerHTML = extract;
                    document.getElementById('dot').style.display = "flex";
                    document.getElementById('contentDiv').style.display = "none";
                }
                // document.getElementById("er-msg").innerHTML = error.response.data.error;
                const element = document.getElementById("dot");
                element.addEventListener("click", () => {
                    element.innerHTML = error.response.data.error;
                    document.getElementById('er-msg').style.display = "none";
                });
                document.getElementById("inputUrl").style.border = "1px solid red";

            } else {
                alert("Unknown Error")
            }
        })
}

const copyContent = async () => {
    let text = document.getElementById('getUrl').innerHTML;
    // console.log(text);
    try {
        await navigator.clipboard.writeText(text);
        setTimeout(function () {
            var x = document.getElementById("button").innerHTML = "Copied";
            const disable = document.querySelector('#button');
            disable.style.backgroundColor = "grey";
            disable.style.pointerEvents = "none";
            disable.disabled = true;
        });
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}