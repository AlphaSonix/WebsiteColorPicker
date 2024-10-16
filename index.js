const colorSelect = document.getElementById("color-picker")
const choiceSelect = document.getElementById('color-choices')
let colorHex = 'F55A5A'
let colorType = 'monochrome'
let colorArray = []

colorSelect.addEventListener("change", function(){
    colorHex = colorSelect.value.replace('#','')
})

choiceSelect.addEventListener("change", function(){
    colorType = choiceSelect.value
})

document.body.addEventListener("click", (e) => {
    const targetColor = e.target.dataset.color
    copyToClipboard(targetColor)
})

function copyToClipboard(targetColor) {
    colorArray.forEach((color)=> {
        if (targetColor === color) {
            navigator.clipboard.writeText(color)
            alert(`Copied the hex: ${color}`)
        }
    })
}

document.getElementById('color-btn').addEventListener("click", function(){
    colorArray = []
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorHex}&mode=${colorType}&count=5`)
    .then(res => res.json())
    .then(data => {
        for (let color of data.colors){
            colorArray.push(color.hex.value)
        }
        render()
    })
})

function render() {
    let colorDisplay = ''
    colorArray.forEach(function(color){
         colorDisplay += `
            <div class="main-display"> 
                <div class="color-display" style="background:${color}" data-color=${color}></div>
                <h2>${color}</h2>
            </div>
    `
    })
    
    document.getElementById("main-display").innerHTML = colorDisplay
}