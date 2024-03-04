(() => {

  function createForm() {
    let containerForm = document.createElement('div');
    let form = document.createElement('form');
    let input = document.createElement('input');
    let button = document.createElement('button');

    containerForm.classList.add('modal-container')
    input.classList.add('form-control', 'mb-3');
    button.classList.add('btn', 'btn-primary');
    input.placeholder = 'Количество карточек по вертикали/горизонтали';
    button.textContent = 'Начать';

    form.append(input, button);
    containerForm.append(form);

    return {
      containerForm,
      form,
      input,
      button,
    }
  }

  function createArray(size, arrayValue) {
    for (let i = 0, j = 1; i < size * size; i += 2, j++) {
      arrayValue.push(j);
      arrayValue.push(j);
    }
  }

  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

  function play(main, size, container, arrayValue, count) {

    let timer = document.createElement('div');
    timer.classList.add('timer');

    timer.textContent = 60;

    let nIntervId = setInterval( Timer, 1000);

    function Timer (){
      if (timer.textContent === '0') {
        gameOver(container, size, nIntervId);
      } else {
        timer.textContent -= 1;
      }
    }
    main.append(timer);

    createArray(size, arrayValue);
    shuffle(arrayValue);
    let item = 0;
    let comparison = [];

    for (let i = 0; i < size; i++) {

      let row = document.createElement('div');
      row.classList.add('cards');

      for (let j = 0; j < size; j++) {

        let card = document.createElement('button');
        card.classList.add('card');
        card.textContent = arrayValue[item];
        card.id = String(item);

        card.addEventListener('click', () => {
          card.style.color = '#000';
          comparison.push(card.id);

          if (comparison.length === 2) {
            let first = document.getElementById(comparison[0]);
            let second = document.getElementById(comparison[1]);

            if (first.textContent !== second.textContent || comparison[0] === comparison[1]) {
              setTimeout(() => { first.style.color = '#fff'; second.style.color = '#fff' }, '500');
            } else count += 2;

            comparison = []
          }
          if (count === size * size) {
            gameOver(container, size, nIntervId);
          }
        });
        row.append(card);
        item++;
      }

      container.append(row);
    }

  }

  function gameOver(container, size, nIntervId) {
    let button = document.createElement('button');

    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Сыграть ещё раз';

    button.addEventListener('click', () => {
      location.reload();
    })

    for ( let i = 0; i < size * size; i++) {
      document.getElementById(String(i)).disabled = true;
    }
    clearInterval(nIntervId);

    setTimeout(() => container.append(button), 300);
  }

  document.addEventListener('DOMContentLoaded', () => {
    let fieldSize = createForm();
    let container = document.getElementById('container');
    let main = document.getElementById('main');
    let size;
    let arrayValue = [];
    let count = 0;

    container.append(fieldSize.containerForm);

    fieldSize.form.addEventListener('submit', () => {
      size = fieldSize.input.value;
      if (size > 10 || size < 2 || size % 2 !== 0) size = 4;
      fieldSize.containerForm.remove();
      play(main, size, container, arrayValue, count, );
    });


  });
})();
