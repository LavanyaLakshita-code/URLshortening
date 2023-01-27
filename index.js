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

// global
let inpUrl = document.getElementById("inputUrl");
let errMsg = document.getElementById('er-msg');
let conDiv = document.getElementById('contentDiv');
let getURL = document.getElementById("getUrl");
let ellipsis = document.getElementById('dot');

// Api fetch Using Axios
function postData() {
    let url = inpUrl.value;
    if (url.length == 0) {
        errMsg.innerHTML = 'No URL specified ("url" parameter is empty)';
        inpUrl.style.border = "1px solid red";
        return false;
    } else {
        axios.get(`https://api.shrtco.de/v2/shorten?url=${url}`)
            .then((response) => {
                conDiv.style.display = "flex";
                getURL.innerHTML = response.data.result.short_link;
                errMsg.style.display = "none";
                ellipsis.style.display = "none";
                inpUrl.style.border = "none";
            }).catch(function (error) {
                if (error.response.data.error_code) {
                    let err = error.response.data.error;
                    if (err.length % 2 == 0 || err.length % 2 !== 0) {
                        let extract = err.slice(0, err.length / 2);
                        errMsg.innerHTML = extract;
                        errMsg.style.display = "flex";
                        ellipsis.style.display = "flex";
                        conDiv.style.display = "none";
                    }
                    ellipsis.addEventListener("click", () => {
                        ellipsis.innerHTML = error.response.data.error;
                        errMsg.style.display = "none";
                    });
                    inpUrl.style.border = "1px solid red";
                } else {
                    alert("Unknown Error")
                }
            })
    }
}

// to copy short link
const copyContent = async () => {
    let text = document.getElementById('getUrl').innerHTML;
    let btn = document.getElementById("button");
    try {
        await navigator.clipboard.writeText(text);
        btn.innerHTML = "Copied";
        btn.style.backgroundColor = "grey";
        btn.style.pointerEvents = "none";
        btn.disabled = true;
        setTimeout(() => {
            btn.innerHTML = "Copy";
            btn.style.backgroundColor = "cyan";
            btn.style.pointerEvents = "auto";
            btn.disabled = false;
        }, 3000);
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}