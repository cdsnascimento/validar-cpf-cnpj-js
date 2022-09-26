const inputText = document.querySelector("#cpf");
const lbl = document.querySelector('#lbl-cpf');
const btn = document.querySelector("#btn");
const sts = document.querySelector("#status");

inputText.onblur = () => {
    let vlr = inputText.value
    if (vlr.length === 11 ) {
        lbl.innerHTML = "CPF"
    } else {
        lbl.innerHTML = "CNPJ"
    }
};

inputText.onfocus = () => {
    console.log('foco');
    sts.innerHTML = '';
    inputText.value = '';
};

btn.addEventListener('click', e => {
    const el = e.target;
    e.preventDefault();
    if (lbl.innerHTML === 'CPF'){
        if (validaCPF(inputText.value)) {
            sts.classList.remove('invalido');
            sts.innerHTML = 'Válido!';
        } else {
            sts.classList.add('invalido');
            sts.innerHTML = 'Inválido!';
        };
    } else if (lbl.innerHTML === 'CNPJ') {
        if (validaCNPJ(inputText.value)) {
            sts.classList.remove('invalido');
            sts.innerHTML = 'Válido!';
        } else {
            sts.classList.add('invalido');
            sts.innerHTML = 'Inválido!';
        };
    }
});


function validaCPF(valor) {
    const v = [...valor.slice(0, 9)].map(v => Number(v));
 
    const d1 = v.map((v, i) => v * (i + 1))
                .reduce((a, v) => a += v) % 11;

    if (d1 === 10) {
        v.push(0);
    } else {
        v.push(d1);
    }
    
    const d2 = v.map((v, i) => v * (i))
                .reduce((a, v) => a += v) % 11;

    if (d2 === 10) {
        v.push(0);
    } else {
        v.push(d2);
    }

    return v.join('') === valor;
    
}

function validaCNPJ(valor){
    const v1 = [...valor.slice(0, 12)].reverse().map(v => Number(v));
    let i = 2;
    let d1 = v1.map(function(v) {

                        const r = (v * i);

                        if (i < 9) {
                            i++;
                        }else{
                            i = 2;
                        }

                        return r;
                    }).reduce((a, v) => a += v) % 11;
    if (d1 === 0 || d1 === 1) {
        d1 = 0;
    } else {
        d1 = 11 - d1;
    }
    
    let v = v1.reverse();
    v.push(d1);


    const v2 = [...v].reverse();
    i = 2;
    let d2 = v2.map(function(v) {

                        const r = (v * i);

                        if (i < 9) {
                            i++;
                        }else{
                            i = 2;
                        }

                        return r;
                    }).reduce((a, v) => a += v) % 11;
    if (d2 === 0 || d2 === 1) {
        d2 = 0;
    } else {
        d2 = 11 - d2;
    }

    v = v2.reverse();
    v.push(d2);
    return v.join('') === valor;
}

