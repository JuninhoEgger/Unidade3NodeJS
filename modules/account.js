module.exports = class Account {

    constructor() {
        //módulos externos
        this.inquirer = require('inquirer')
        this.chalk = require('chalk')
            //módulos core - files
        this.fs = require('fs')
    }
    main() {
        this.inquirer
            .prompt([{
                type: 'list',
                name: 'action',
                message: 'O QUE VOCÊ DESEJA FAZER?',
                choices: [
                    'CRIAR CONTA',
                    'SAIR',
                ],
            }, ])
            .then((answer) => {
                const action = answer['action']
                switch (action) {
                    case 'CRIAR CONTA':
                        this.createAccount()
                        break;
                    case 'SAIR':
                        console.log('ATÉ MAIS, OBRIGADO POR UTILIZAR A APLICAÇÃO XPTO')
                        process.exit()
                        break;
                    default:
                        break;
                }
            })
    }

    createAccount() {
        console.log(this.chalk.green.bold("INFORME OS DADOS DA CONTA"))
        this.buildAccount()
    }


    buildAccount() {
        this.inquirer
            .prompt([
                { name: 'numberAccount', message: 'QUAL O NÚMERO DA CONTA?' },
                { name: 'openingBalance', message: 'QUAL O SALDO INICIAL?' },
            ])
            .then((answers) => {

                const numberAccount = parseInt(answers.numberAccount)
                const openingBalance = parseFloat(answers.openingBalance)

                console.log(`A CONTA ${answers.numberAccount} TEM R$ ${answers.openingBalance}`)

                if (!this.fs.existsSync('account')) {
                    this.fs.mkdirSync('account')
                }

                this.saveFile(answers)

                console.log('CONTA CRIADA COM SUCESSO')
                this.main()
            })
            .catch((err) => {
                console.log(err)
            })
    }
    saveFile(answers) {
        let dataJSON
        let data

        if (!this.fs.existsSync("account/registrations.json")) {
            data = ` [{ "numberAccount": ${answers.numberAccount}, "openingBalance": ${answers.openingBalance} }]`
        } else {
            dataJSON = this.fs.readFileSync("account/registrations.json", 'utf8')
            data = JSON.parse(dataJSON)
            data.push({ 'numberAccount': parseInt(answers.numberAccount), 'openingBalance': parseFloat(answers.openingBalance) })
            data = JSON.stringify(data)
        }

        this.fs.writeFileSync(
            "account/registrations.json",
            data,
            function(err) {
                console.log(err)
            },
        )
    }
}