class Calculator {
    constructor(topBlockTextElement, currentOperandTextElement) {
        this.topBlockTextElement = topBlockTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }


    clear() {
        this.topBlock = ''
        this.currentOperand = ''
        this.operation = undefined
    };

    delete () {
        this.currentOperand = this.currentOperand.slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand + number
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.topBlock !== '') {
            this.compute()
        }
        this.operation = operation
        this.topBlock = this.currentOperand + operation
        this.currentOperand = ''
    }

    compute() {
        if (this.currentOperand === '' && this.topBlock === '')
        this.currentOperand = `Vit'ok 4ervya4ok))`
        let result
        const top = parseFloat(this.topBlock)
        const cur = parseFloat(this.currentOperand)
        if (isNaN(top) || isNaN(cur)) return
        switch (this.operation) {
            case '+':
                result = top + cur
                break
            case '-':
                result = top - cur
                break
            case '/':
                result = top / cur
                break
            case '*':
                result = top * cur
                break
        }
        this.currentOperand = result
        this.topBlock = ''
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
        this.topBlockTextElement.innerText = this.topBlock
    }

};
const numberButtons = document.querySelectorAll('[data-number]');
const operandsButton = document.querySelectorAll('[data-operand]');
const equalButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const topBlockTextElement = document.querySelector('[data-top-block]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');


const calculator = new Calculator(topBlockTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operandsButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

allClearButton.addEventListener('click', button => {
    calculator.currentOperand = ''
    calculator.topBlock = ''
    calculator.updateDisplay()
})

equalButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

