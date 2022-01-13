let list = []

function generateRandomColor()
{
    var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    return randomColor;
}

const ourList = document.querySelector('[data-list]')
const inputList = document.getElementById('input-text')
const addButton = document.querySelector('[data-add-button]')
const ourDivchik = document.querySelector('[data-our-div]')

addButton.addEventListener('click', button => {
    if (inputList.value == "") {
        Swal.fire({
        title: 'Oops...',
        text: 'Write some task!',
      })
      return
    }
      else
    list.push(inputList.value)
        const mainDiv = document.createElement('div')
        const firstDiv = document.createElement('div')
        const lishka = document.createElement('li')
        const addButton = document.createElement('button')
        const deleteButton = document.createElement('button')
        const secondDiv = document.createElement('div')
        const breakLine = document.createElement('div')

        mainDiv.setAttribute("id", "main-div")
        firstDiv.setAttribute("id", "first-div")
        lishka.setAttribute("id", "lishka")
        addButton.setAttribute("id", "add-sub-task")
        deleteButton.setAttribute("id", "delete-button")
        secondDiv.setAttribute("id", "second-div")
        breakLine.setAttribute("id", "break-line")

        lishka.innerText = list[list.length-1]
        ourList.appendChild(mainDiv)
        mainDiv.appendChild(firstDiv)
        firstDiv.appendChild(lishka)
        firstDiv.appendChild(addButton)
        firstDiv.appendChild(deleteButton)
        mainDiv.appendChild(secondDiv)
        mainDiv.appendChild(breakLine)
        console.log(list)

      breakLine.style.background = generateRandomColor()

        deleteButton.addEventListener('click', e => {
          mainDiv.parentNode.removeChild(mainDiv)
        })
    inputList.value = ""

    addButton.addEventListener('click', e => {
      if (inputList.value == "") {
        Swal.fire({
        title: 'Oops...',
        text: 'Write some sub task!',
      })
      return
    }
      else  
      list.push(inputList.value)

            const lishka = document.createElement('ol')
            const btn = document.createElement('button')

            lishka.setAttribute("id", "second-lishka")
            btn.setAttribute("id", "delete-button")

            lishka.innerText = list[list.length-1]
            secondDiv.appendChild(lishka)
            secondDiv.appendChild(btn)
            console.log(list)

            btn.addEventListener('click', e => {
                lishka.parentNode.removeChild(lishka)
                btn.parentNode.removeChild(btn)
            })
            inputList.value = ""
    })
})