(() => {
  'use strict';

  const LEVELS = [
    {
      title: '單字營地', subtitle: 'Vocabulary Camp', accent: 0x82dcc5, bg: 0x173b3c,
      questions: [
        { prompt: 'Choose the opposite of “happy”.', hint: '找出「happy」的相反詞。', choices: ['sad', 'clean', 'fast'], answer: 'sad' },
        { prompt: 'Which word means「圖書館」?', hint: '想想看，哪個地方可以借書？', choices: ['museum', 'library', 'station'], answer: 'library' },
        { prompt: 'Choose the meaning of “careful”.', hint: '“Be careful!” 是提醒你要怎麼做？', choices: ['小心的', '無聊的', '飢餓的'], answer: '小心的' },
        { prompt: 'A person who teaches students is a _____.', hint: '老師的英文是什麼？', choices: ['doctor', 'teacher', 'farmer'], answer: 'teacher' },
        { prompt: 'Which word means「開始」?', hint: '音樂會要「開始」了！', choices: ['finish', 'begin', 'forget'], answer: 'begin' },
      ],
    },
    {
      title: '文法森林', subtitle: 'Grammar Forest', accent: 0x9bd57e, bg: 0x294539,
      questions: [
        { prompt: 'I _____ a student.', hint: 'be 動詞選擇：主詞 I 要搭配哪一個？', choices: ['am', 'is', 'are'], answer: 'am' },
        { prompt: 'They _____ basketball after school.', hint: '主詞 They 搭配哪個動詞？', choices: ['plays', 'play', 'playing'], answer: 'play' },
        { prompt: 'He _____ TV every night.', hint: '現在簡單式，He 後面的動詞要加什麼？', choices: ['watch', 'watches', 'watching'], answer: 'watches' },
        { prompt: 'My sister and I _____ lunch at noon.', hint: 'My sister and I = We。We 要搭配哪個動詞？', choices: ['has', 'have', 'having'], answer: 'have' },
        { prompt: '_____ your parents work here?', hint: 'parents 是複數，問句的助動詞要選哪個？', choices: ['Do', 'Does', 'Are'], answer: 'Do' },
      ],
    },
    {
      title: '日常小鎮', subtitle: 'Daily Life Town', accent: 0xffc77d, bg: 0x514235,
      questions: [
        { prompt: 'He brushes his _____ every morning.', hint: '每天早上刷牙，英文要說 brush his…', choices: ['teeth', 'shoes', 'hands'], answer: 'teeth' },
        { prompt: 'The class starts _____ 8:00.', hint: '時間點前面要用哪個介系詞？', choices: ['at', 'in', 'on'], answer: 'at' },
        { prompt: 'We go to school _____ bus.', hint: '搭公車的英文說法是 by bus。', choices: ['by', 'on', 'in'], answer: 'by' },
        { prompt: 'There _____ two apples on the table.', hint: 'two apples 是複數，be 動詞要怎麼選？', choices: ['is', 'are', 'be'], answer: 'are' },
        { prompt: 'I am interested _____ music.', hint: '固定搭配：be interested in。', choices: ['in', 'at', 'for'], answer: 'in' },
      ],
    },
    {
      title: '旅行海灣', subtitle: 'Travel Bay', accent: 0x83cfff, bg: 0x244254,
      questions: [
        { prompt: 'Tainan is famous _____ its history.', hint: '固定搭配：be famous for（以……聞名）。', choices: ['for', 'with', 'about'], answer: 'for' },
        { prompt: '“What is the weather like?”', hint: '這句話是在問天氣，哪個回答最合適？', choices: ['It is sunny.', 'I am twelve.', 'At the station.'], answer: 'It is sunny.' },
        { prompt: 'You should wear a coat. It is _____ outside.', hint: '外面很冷，才需要穿外套。', choices: ['cold', 'hungry', 'tall'], answer: 'cold' },
        { prompt: '“Can I help you?” — “Yes, _____.”', hint: '在車站問路時，可以說「我在找車站」。', choices: ["I'm looking for the station.", 'I like the station.', 'It is a station.'], answer: "I'm looking for the station." },
        { prompt: 'Where _____ you go last Sunday?', hint: 'last Sunday 是過去時間，疑問句要用哪個助動詞？', choices: ['did', 'do', 'are'], answer: 'did' },
      ],
    },
    {
      title: '決戰城堡', subtitle: 'Final Castle', accent: 0xd7a8ff, bg: 0x433555,
      questions: [
        { prompt: 'If it _____ tomorrow, we’ll stay home.', hint: '第一類條件句的 if 子句用現在簡單式。', choices: ['rains', 'rain', 'will rain'], answer: 'rains' },
        { prompt: 'I’ve known Amy _____ three years.', hint: '一段時間搭配 for；起點時間才搭配 since。', choices: ['for', 'since', 'at'], answer: 'for' },
        { prompt: 'The book _____ by my teacher.', hint: '被動語態：書「被老師寫」，選過去式被動。', choices: ['was written', 'wrote', 'is writing'], answer: 'was written' },
        { prompt: 'She is taller _____ her brother.', hint: '比較級 taller 後面接哪個字？', choices: ['than', 'then', 'as'], answer: 'than' },
        { prompt: 'I was doing homework when Mom _____ home.', hint: 'when 子句表示另一件過去發生的事。', choices: ['came', 'comes', 'coming'], answer: 'came' },
      ],
    },
  ];

  const TOTAL_QUESTIONS = LEVELS.reduce((sum, level) => sum + level.questions.length, 0);
  const stageList = document.getElementById('stageList');
  const scoreValue = document.getElementById('scoreValue');
  const correctCount = document.getElementById('correctCount');
  const totalProgress = document.getElementById('totalProgress');
  const questionText = document.getElementById('questionText');
  const questionHint = document.getElementById('questionHint');
  const questionCount = document.getElementById('questionCount');
  const levelLabel = document.getElementById('levelLabel');
  const areaName = document.getElementById('areaName');
  const toast = document.getElementById('toast');
  const startOverlay = document.getElementById('startOverlay');
  const finishOverlay = document.getElementById('finishOverlay');
  const startButton = document.getElementById('startButton');
  const restartButton = document.getElementById('restartButton');
  const playAgainButton = document.getElementById('playAgainButton');
  const mobileDirections = { up: false, down: false, left: false, right: false };

  stageList.innerHTML = LEVELS.map((level, index) => `
    <li class="stage-item${index === 0 ? ' active' : ''}" data-stage="${index}">
      <span class="stage-number">${String(index + 1).padStart(2, '0')}</span>
      <span class="stage-copy"><b>${level.title}</b><small>${level.subtitle}</small></span>
      <span class="stage-check" aria-hidden="true"></span>
    </li>`).join('');

  function updateInterface(state) {
    scoreValue.textContent = String(state.score);
    correctCount.textContent = String(state.correct);
    totalProgress.style.width = `${(state.correct / TOTAL_QUESTIONS) * 100}%`;
    if (state.complete) {
      document.getElementById('finalScore').textContent = String(state.score);
      finishOverlay.hidden = false;
      return;
    }
    const level = LEVELS[state.level];
    const question = level.questions[state.question];
    levelLabel.textContent = `第 ${state.level + 1} 關 · ${level.title}`;
    questionCount.textContent = `第 ${state.question + 1} 題 / ${level.questions.length}`;
    questionText.textContent = question.prompt;
    questionHint.textContent = question.hint;
    areaName.textContent = level.title;
    document.querySelectorAll('.stage-item').forEach((item, index) => {
      item.classList.toggle('active', index === state.level);
      item.classList.toggle('done', index < state.level);
      item.querySelector('.stage-check').textContent = index < state.level ? '✓' : '';
    });
  }

  let toastTimer;
  function showToast(message, type) {
    toast.textContent = message;
    toast.className = `toast show ${type || ''}`;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 1150);
  }

  class QuestScene extends Phaser.Scene {
    constructor() {
      super('QuestScene');
      this.score = 0;
      this.levelIndex = 0;
      this.questionIndex = 0;
      this.correct = 0;
      this.started = false;
      this.roundLocked = false;
      this.cards = [];
      this.obstacles = [];
    }

    create() {
      this.createTextures();
      this.physics.world.setBounds(20, 20, 920, 500);
      this.keys = this.input.keyboard.createCursorKeys();
      this.wasd = this.input.keyboard.addKeys('W,A,S,D');
      this.input.keyboard.addCapture(['UP', 'DOWN', 'LEFT', 'RIGHT', 'W', 'A', 'S', 'D']);
      this.input.keyboard.on('keydown', (event) => {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(event.key)) event.preventDefault();
      });

      this.player = this.physics.add.sprite(480, 465, 'bobo');
      this.player.setDepth(5).setCollideWorldBounds(true);
      this.player.body.setSize(29, 35).setOffset(9, 10);
      this.player.setBounce(0);
      this.physics.world.setBoundsCollision(true, true, true, true);

      this.obstacleGroup = this.physics.add.staticGroup();
      this.physics.add.collider(this.player, this.obstacleGroup);
      this.drawArena();
      this.loadQuestion();
      this.updateEvent();
    }

    createTextures() {
      const bobo = this.make.graphics({ x: 0, y: 0, add: false });
      // 小藍企鵝 Bobo：藍色身體、白肚皮、黃色嘴喙與腳。
      bobo.fillStyle(0x071b25, 0.24); bobo.fillEllipse(24, 51, 31, 7);
      bobo.fillStyle(0x347da7, 1); bobo.fillEllipse(24, 30, 34, 39);
      bobo.fillStyle(0x286b91, 1); bobo.fillEllipse(10, 31, 13, 25); bobo.fillEllipse(38, 31, 13, 25);
      bobo.fillStyle(0xf2fbf7, 1); bobo.fillEllipse(24, 34, 21, 25);
      bobo.fillStyle(0x347da7, 1); bobo.fillCircle(24, 17, 15);
      bobo.fillStyle(0xf7fcf8, 1); bobo.fillCircle(18.5, 16, 3.2); bobo.fillCircle(29.5, 16, 3.2);
      bobo.fillStyle(0x142c39, 1); bobo.fillCircle(19.2, 16.5, 1.35); bobo.fillCircle(28.8, 16.5, 1.35);
      bobo.fillStyle(0xffc65c, 1); bobo.fillTriangle(21, 21, 27, 21, 24, 25);
      bobo.fillStyle(0x789ff0, 1); bobo.fillRoundedRect(12, 28, 24, 4, 2);
      bobo.fillStyle(0xffc65c, 1); bobo.fillEllipse(17, 48, 10, 5); bobo.fillEllipse(31, 48, 10, 5);
      bobo.generateTexture('bobo', 48, 56); bobo.destroy();

      const obstacle = this.make.graphics({ x: 0, y: 0, add: false });
      obstacle.fillStyle(0x061c23, .22); obstacle.fillRoundedRect(4, 9, 64, 43, 13);
      obstacle.fillStyle(0x255b58, 1); obstacle.fillRoundedRect(3, 3, 64, 42, 13);
      obstacle.fillStyle(0x32756d, 1); obstacle.fillRoundedRect(8, 7, 54, 28, 10);
      obstacle.fillStyle(0x80be8f, .8); obstacle.fillCircle(22, 17, 3); obstacle.fillCircle(43, 25, 2);
      obstacle.generateTexture('island', 72, 56); obstacle.destroy();

    }

    drawArena() {
      if (this.arenaGraphics) this.arenaGraphics.destroy();
      this.arenaGraphics = this.add.graphics().setDepth(0);
      const level = LEVELS[this.levelIndex] || LEVELS[0];
      const g = this.arenaGraphics;
      g.fillStyle(level.bg, 1); g.fillRoundedRect(0, 0, 960, 540, 18);
      g.fillStyle(0x102a31, .23); g.fillRoundedRect(14, 14, 932, 512, 17);
      g.lineStyle(1, 0xd5f1dc, .055);
      for (let x = 38; x < 960; x += 44) g.lineBetween(x, 24, x, 516);
      for (let y = 30; y < 540; y += 44) g.lineBetween(24, y, 936, y);
      g.lineStyle(2, level.accent, .32); g.strokeRoundedRect(18, 18, 924, 504, 17);
      g.lineStyle(1, 0xe1f5dc, .1); g.strokeRoundedRect(25, 25, 910, 490, 13);
      // A few subtle stepping-stone dots give the field texture without hiding the answer cards.
      g.fillStyle(0xe1f5dc, .11);
      [[100,92],[857,92],[96,465],[864,462],[320,115],[643,460],[836,323],[118,322]].forEach(([x,y]) => g.fillCircle(x,y,2));
      if (this.obstacleGroup) {
        this.obstacleGroup.clear(true, true);
        this.obstacles = [];
        const layouts = [
          [[367, 233, 83, 54], [605, 350, 82, 52], [244, 356, 74, 48]],
          [[358, 335, 88, 52], [600, 218, 94, 55], [790, 340, 72, 46]],
          [[322, 221, 83, 52], [631, 357, 90, 54], [795, 235, 72, 46]],
          [[379, 350, 90, 54], [587, 224, 83, 52], [760, 358, 76, 48]],
          [[340, 222, 92, 56], [618, 349, 94, 55], [786, 226, 76, 48]],
        ];
        (layouts[this.levelIndex] || layouts[0]).forEach(([x, y, w, h]) => {
          const item = this.obstacleGroup.create(x, y, 'island').setDisplaySize(w, h).setDepth(2);
          item.refreshBody();
          this.obstacles.push({ x, y, w, h });
        });
      }
    }

    loadQuestion() {
      this.roundLocked = false;
      this.cards.forEach((card) => card.destroy());
      this.cards = [];
      const question = LEVELS[this.levelIndex].questions[this.questionIndex];
      const choices = Phaser.Utils.Array.Shuffle(question.choices.slice());
      const spots = this.safeSpots();
      Phaser.Utils.Array.Shuffle(spots);
      choices.forEach((answer, index) => {
        const [x, y] = spots[index];
        const card = this.makeAnswerCard(x, y, answer, answer === question.answer);
        this.cards.push(card);
        this.physics.add.overlap(this.player, card, () => this.collect(card), undefined, this);
      });
      this.updateEvent();
    }

    safeSpots() {
      const candidates = [
        [155, 126], [380, 126], [600, 126], [816, 126],
        [155, 282], [380, 282], [600, 282], [816, 282],
        [155, 436], [380, 436], [600, 436], [816, 436],
      ];
      return candidates.filter(([x, y]) => !this.obstacles.some((o) => Math.abs(x - o.x) < (o.w / 2 + 82) && Math.abs(y - o.y) < (o.h / 2 + 42)));
    }

    makeAnswerCard(x, y, label, correct) {
      const container = this.add.container(x, y).setDepth(4);
      const width = label.length > 21 ? 190 : label.length > 13 ? 172 : 150;
      const bg = this.add.graphics();
      bg.fillStyle(0x09222c, .28); bg.fillRoundedRect(-width / 2 + 1, -26 + 4, width, 58, 12);
      bg.fillStyle(0x1c4650, 1); bg.fillRoundedRect(-width / 2, -29, width, 58, 12);
      bg.lineStyle(1.4, 0xa2d8ca, .54); bg.strokeRoundedRect(-width / 2, -29, width, 58, 12);
      bg.fillStyle(0x8de2d0, .14); bg.fillCircle(-width / 2 + 15, 0, 4);
      const text = this.add.text(4, 0, label, {
        fontFamily: 'DM Sans, Noto Sans TC, sans-serif', fontSize: label.length > 24 ? '11px' : label.length > 15 ? '12px' : '15px',
        color: '#f0faf3', fontStyle: 'bold', align: 'center',
        wordWrap: { width: width - 30 },
      }).setOrigin(.5);
      container.add([bg, text]);
      container.setSize(width, 58);
      container.setData({ answer: label, correct });
      this.physics.add.existing(container, true);
      container.body.setSize(width - 4, 54, true);
      return container;
    }

    collect(card) {
      if (this.roundLocked || !card.active) return;
      const isCorrect = card.getData('correct');
      card.destroy();
      this.cards = this.cards.filter((item) => item !== card);
      if (!isCorrect) {
        this.score -= 5;
        showToast('再想一想！答錯 −5 分', 'error');
        this.updateEvent();
        return;
      }
      this.score += 10;
      this.correct += 1;
      this.roundLocked = true;
      showToast('答對了！Bobo +10 分 ✦', 'success');
      this.updateEvent();
      this.time.delayedCall(850, () => this.nextQuestion());
    }

    nextQuestion() {
      if (!this.scene.isActive()) return;
      const level = LEVELS[this.levelIndex];
      if (this.questionIndex < level.questions.length - 1) {
        this.questionIndex += 1;
        this.loadQuestion();
        return;
      }
      if (this.levelIndex < LEVELS.length - 1) {
        this.levelIndex += 1;
        this.questionIndex = 0;
        this.drawArena();
        this.player.setPosition(480, 465);
        showToast(`通過 ${level.title}！前往下一關`, 'success');
        this.loadQuestion();
        return;
      }
      this.cards.forEach((card) => card.destroy());
      this.cards = [];
      this.updateEvent(true);
    }

    updateEvent(complete = false) {
      const state = { score: this.score, level: this.levelIndex, question: this.questionIndex, correct: this.correct, complete };
      updateInterface(state);
    }

    update(_time, delta) {
      if (!this.started || !this.player?.body) return;
      const speed = 220;
      let x = 0;
      let y = 0;
      if (this.keys.left.isDown || this.wasd.A.isDown || mobileDirections.left) x -= 1;
      if (this.keys.right.isDown || this.wasd.D.isDown || mobileDirections.right) x += 1;
      if (this.keys.up.isDown || this.wasd.W.isDown || mobileDirections.up) y -= 1;
      if (this.keys.down.isDown || this.wasd.S.isDown || mobileDirections.down) y += 1;
      if (x && y) { x *= Math.SQRT1_2; y *= Math.SQRT1_2; }
      this.player.setVelocity(x * speed, y * speed);
      if (x !== 0) this.player.setFlipX(x < 0);
      if (x || y) this.player.rotation = Math.sin(this.time.now / 95) * .035;
      else this.player.rotation = 0;
      this.player.y = Phaser.Math.Clamp(this.player.y, 45, 495);
    }

    start() { this.started = true; }

    reset() {
      this.score = 0; this.levelIndex = 0; this.questionIndex = 0; this.correct = 0;
      this.started = false;
      this.player.setPosition(480, 465).setVelocity(0, 0);
      this.drawArena();
      finishOverlay.hidden = true;
      startOverlay.hidden = false;
      this.loadQuestion();
    }
  }

  function boot() {
    if (!window.Phaser) {
      document.getElementById('loadError').hidden = false;
      return;
    }
    const config = {
      type: Phaser.AUTO,
      parent: 'gameHost',
      width: 960,
      height: 540,
      transparent: false,
      backgroundColor: '#173b3c',
      scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
      physics: { default: 'arcade', arcade: { debug: false } },
      render: { antialias: true, pixelArt: false, roundPixels: true },
      scene: [QuestScene],
    };
    const game = new Phaser.Game(config);
    const scene = () => game.scene.getScene('QuestScene');

    startButton.addEventListener('click', () => {
      startOverlay.hidden = true;
      scene().start();
      game.canvas?.focus?.();
    });
    restartButton.addEventListener('click', () => {
      scene().reset();
      document.querySelectorAll('.stage-item').forEach((item, index) => {
        item.classList.toggle('active', index === 0);
        item.classList.remove('done');
        item.querySelector('.stage-check').textContent = '';
      });
      showToast('Bobo 準備好重新出發！', 'success');
    });
    playAgainButton.addEventListener('click', () => {
      scene().reset();
      document.querySelectorAll('.stage-item').forEach((item, index) => {
        item.classList.toggle('active', index === 0);
        item.classList.remove('done');
        item.querySelector('.stage-check').textContent = '';
      });
      startOverlay.hidden = false;
    });

    const release = (button) => {
      const dir = button.dataset.dir;
      if (dir) mobileDirections[dir] = false;
      button.classList.remove('pressed');
    };
    document.querySelectorAll('.dpad-button').forEach((button) => {
      button.addEventListener('pointerdown', (event) => {
        event.preventDefault();
        mobileDirections[button.dataset.dir] = true;
        button.classList.add('pressed');
        button.setPointerCapture(event.pointerId);
      });
      ['pointerup', 'pointercancel', 'lostpointercapture'].forEach((name) => button.addEventListener(name, () => release(button)));
    });
    window.addEventListener('blur', () => Object.keys(mobileDirections).forEach((key) => { mobileDirections[key] = false; }));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
