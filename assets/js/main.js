(function() {
	// DOM 元素
	const landingPage = document.getElementById('landing-page');
	const cutePage = document.getElementById('cute-page');
	const enterBtn = document.getElementById('enter-btn');
	const backBtn = document.getElementById('back-btn');
	const sparkContainer = document.getElementById('spark-container');
	const fallingContainer = document.getElementById('falling-container');
	const cuteCardsGrid = document.getElementById('cute-cards-grid');
	const randomBtn = document.getElementById('random-btn');
	const allBtn = document.getElementById('all-btn');
	const zodiacBtn = document.getElementById('zodiac-btn');
	const loadingOverlay = document.getElementById('loading-overlay');

	// ==================== 动物池 ====================
	const animalPool = [
		{ emoji: '🐱', name: '小猫咪', desc: '喵星人本喵~', sound: '喵~ 喵呜~' },
		{ emoji: '🐶', name: '小狗狗', desc: '摇尾巴专业户', sound: '汪！汪汪！' },
		{ emoji: '🐰', name: '小兔兔', desc: '蹦蹦跳跳真可爱', sound: '蹦蹦~ 跳跳~' },
		{ emoji: '🐼', name: '大熊猫', desc: '国宝级可爱', sound: '嗯~ 哼~' },
		{ emoji: '🦭', name: '小海豹', desc: '圆滚滚的抱抱', sound: '嗷呜~ 嗷呜~' },
		{ emoji: '🐥', name: '小鸭子', desc: '毛茸茸一团', sound: '嘎嘎~ 嘎嘎~' },
		{ emoji: '🐹', name: '小仓鼠', desc: '腮帮子鼓鼓', sound: '吱吱~ 吱~' },
		{ emoji: '🐨', name: '考拉', desc: '睡神本神', sound: 'zzZ... 呼~' },
		{ emoji: '🦊', name: '小狐狸', desc: '狡黠又迷人', sound: '嗷~ 嘤~' },
		{ emoji: '🐯', name: '小老虎', desc: '奶凶奶凶的', sound: '嗷呜！嗷！' },
		{ emoji: '🐧', name: '小企鹅', desc: '摇摇摆摆走路', sound: '啾啾~ 啾~' },
		{ emoji: '🦄', name: '独角兽', desc: '梦幻闪闪亮', sound: '✨ 叮~ ✨' },
		{ emoji: '🐮', name: '小奶牛', desc: '哞哞叫的温柔', sound: '哞~ 哞~' },
		{ emoji: '🐷', name: '小猪猪', desc: '粉粉嫩嫩', sound: '哼哼~ 哼~' },
		{ emoji: '🐸', name: '小青蛙', desc: '呱呱小王子', sound: '呱呱！呱！' },
		{ emoji: '🐙', name: '小章鱼', desc: '八爪小可爱', sound: '噗噗~ 噗~' },
		{ emoji: '🦝', name: '小浣熊', desc: '洗洗更健康', sound: '咔咔~ 咔~' },
		{ emoji: '🐿️', name: '花栗鼠', desc: '腮帮子塞满', sound: '叽叽！叽！' },
		{ emoji: '🦥', name: '树懒', desc: '慢~悠~悠~', sound: '呼…… 呼……' },
		{ emoji: '🐳', name: '小鲸鱼', desc: '喷水小可爱', sound: '呜~ 呜~' },
		{ emoji: '🐭', name: '小老鼠', desc: '机灵小不点', sound: '吱吱！吱！' },
		{ emoji: '🐲', name: '小龙龙', desc: '腾云驾雾', sound: '嗷~ 呼~' },
		{ emoji: '🐍', name: '小蛇蛇', desc: '扭扭更健康', sound: '嘶嘶~ 嘶~' },
		{ emoji: '🐴', name: '小马驹', desc: '哒哒哒小跑', sound: '嘶~ 咴儿~' },
		{ emoji: '🐑', name: '小绵羊', desc: '软绵绵一团', sound: '咩~ 咩~' },
		{ emoji: '🐵', name: '小猴子', desc: '调皮捣蛋鬼', sound: '吱吱！嘻嘻~' },
		{ emoji: '🐔', name: '小鸡崽', desc: '毛茸茸球', sound: '叽叽！叽叽！' }
	];

	const DISPLAY_COUNT = 12;
	const ZODIAC_ORDER = ['🐭', '🐮', '🐯', '🐰', '🐲', '🐍', '🐴', '🐑', '🐵', '🐔', '🐶', '🐷'];
	let currentMode = 'random';
	let cachedRandomAnimals = null;

	// 十二生肖顺序校验
	function validateZodiac() {
		ZODIAC_ORDER.forEach(emoji => {
		if (!animalPool.some(a => a.emoji === emoji)) {
		console.warn(`十二生肖缺失：${emoji} 不在动物池中，请检查。`);
		}
		});
	}
	validateZodiac();

	function getRandomAnimals(count) {
		if (cachedRandomAnimals) return cachedRandomAnimals;
		const shuffled = [...animalPool].sort(() => Math.random() - 0.5);
		cachedRandomAnimals = shuffled.slice(0, count);
		return cachedRandomAnimals;
	}

	function refreshRandomCache() {
		const shuffled = [...animalPool].sort(() => Math.random() - 0.5);
		cachedRandomAnimals = shuffled.slice(0, DISPLAY_COUNT);
		return cachedRandomAnimals;
	}

	function getZodiacAnimals() {
		const zodiacAnimals = [];
		ZODIAC_ORDER.forEach(zodiacEmoji => {
		const found = animalPool.find(animal => animal.emoji === zodiacEmoji);
		if (found) zodiacAnimals.push(found);
		});
		return zodiacAnimals;
	}

	function renderCards(animals) {
		cuteCardsGrid.innerHTML = '';
		animals.forEach((animal, index) => {
		const card = document.createElement('div');
		card.className = 'animal-card';
		card.setAttribute('tabindex', '0');
		card.setAttribute('role', 'listitem');
		card.setAttribute('aria-label', `${animal.name}，${animal.desc}，点击听叫声`);
		card.style.animationDelay = `${index * 0.05}s`;
		card.innerHTML = `
		<span class="card-emoji" aria-hidden="true">${animal.emoji}</span>
		<div class="card-name">${animal.name}</div>
		<div class="card-desc">${animal.desc}</div>
		`;
		cuteCardsGrid.appendChild(card);
		});

		requestAnimationFrame(() => {
		const allCards = cuteCardsGrid.querySelectorAll('.animal-card');
		allCards.forEach((card, i) => {
		card.classList.add('animating');
		card.style.animationDelay = `${i * 0.05}s`;
		});
		});
	}

	// 事件委托处理卡片点击与键盘事件
	cuteCardsGrid.addEventListener('click', handleCardInteraction);
	cuteCardsGrid.addEventListener('keydown', (e) => {
		if (e.key === 'Enter' || e.key === ' ') {
		const card = e.target.closest('.animal-card');
		if (card) {
		e.preventDefault();
		handleCardInteraction({ target: card });
		}
		}
	});

	function handleCardInteraction(event) {
		const card = event.target.closest('.animal-card');
		if (!card) return;
		const nameEl = card.querySelector('.card-name');
		const animalName = nameEl ? nameEl.textContent : '';
		const animal = animalPool.find(a => a.name === animalName);
		if (animal) {
		showBubble(card, animal.sound);
		if (window.navigator && window.navigator.vibrate) {
		window.navigator.vibrate(15);
		}
		card.style.transition = 'all 0.1s ease';
		card.style.transform = 'scale(0.9)';
		setTimeout(() => {
		card.style.transition = 'all 0.35s cubic-bezier(0.22, 0.61, 0.36, 1)';
		card.style.transform = '';
		}, 100);
		}
	}

	// 修复后的气泡显示函数 —— 作为卡片的子元素绝对定位
	function showBubble(cardElement, text) {
		const bubble = document.createElement('span');
		bubble.className = 'card-bubble';
		bubble.textContent = text;
		// 直接使用 CSS 类中定义的样式，不需要额外设置 left/top/transform
		cardElement.appendChild(bubble);
		bubble.addEventListener('animationend', () => bubble.remove());
		setTimeout(() => { if (bubble.parentNode) bubble.remove(); }, 1200);
	}

	// ==================== 模式切换 (单击随机刷新) ====================
	function setMode(mode, forceRefresh = false) {
		currentMode = mode;
		randomBtn.classList.remove('active-mode');
		allBtn.classList.remove('active-mode');
		zodiacBtn.classList.remove('active-mode');
		randomBtn.setAttribute('aria-pressed', 'false');
		allBtn.setAttribute('aria-pressed', 'false');
		zodiacBtn.setAttribute('aria-pressed', 'false');

		if (mode === 'random') {
		randomBtn.classList.add('active-mode');
		randomBtn.setAttribute('aria-pressed', 'true');
		if (forceRefresh || !cachedRandomAnimals) {
		refreshRandomCache();
		}
		renderCards(getRandomAnimals(DISPLAY_COUNT));
		} else if (mode === 'all') {
		allBtn.classList.add('active-mode');
		allBtn.setAttribute('aria-pressed', 'true');
		renderCards([...animalPool]);
		} else if (mode === 'zodiac') {
		zodiacBtn.classList.add('active-mode');
		zodiacBtn.setAttribute('aria-pressed', 'true');
		renderCards(getZodiacAnimals());
		}
	}

	// 随机按钮：单击直接刷新
	randomBtn.addEventListener('click', () => {
		if (currentMode === 'random') {
		setMode('random', true);
		randomBtn.style.transform = 'scale(0.95)';
		setTimeout(() => { randomBtn.style.transform = ''; }, 150);
		} else {
		setMode('random', false);
		}
	});
	allBtn.addEventListener('click', () => setMode('all'));
	zodiacBtn.addEventListener('click', () => setMode('zodiac'));

	// ==================== 粒子系统 ====================
	let animFrameId = null;
	let lastSparkTime = 0;
	let lastFallingTime = 0;
	const SPARK_INTERVAL = 100;
	const FALLING_INTERVAL = 350;

	function particleLoop(timestamp) {
		if (!document.hidden) {
		if (landingPage.style.display !== 'none' && !landingPage.classList.contains('exit')) {
		if (timestamp - lastSparkTime >= SPARK_INTERVAL) {
			createSparkParticle();
			lastSparkTime = timestamp;
		}
		}
		if (cutePage.style.display === 'flex' && cutePage.classList.contains('visible')) {
		if (timestamp - lastFallingTime >= FALLING_INTERVAL) {
			createFallingParticle();
			lastFallingTime = timestamp;
		}
		}
		}
		animFrameId = requestAnimationFrame(particleLoop);
	}

	function startParticleLoop() {
		if (animFrameId) return;
		lastSparkTime = performance.now();
		lastFallingTime = performance.now();
		animFrameId = requestAnimationFrame(particleLoop);
	}

	function stopParticleLoop() {
		if (animFrameId) {
		cancelAnimationFrame(animFrameId);
		animFrameId = null;
		}
		sparkContainer.innerHTML = '';
		fallingContainer.innerHTML = '';
	}

	function createSparkParticle() {
		const spark = document.createElement('div');
		spark.className = 'spark-particle';
		spark.style.left = Math.random() * 90 + '%';
		spark.style.bottom = Math.random() * 35 + '%';
		spark.style.setProperty('--drift', (Math.random() - 0.5) * 180 + 'px');
		spark.style.width = (Math.random() * 5 + 2) + 'px';
		spark.style.height = spark.style.width;
		spark.style.animationDuration = (Math.random() * 1.5 + 1.2) + 's';
		const colors = ['#ff4400','#ff6600','#ff8800','#ffaa00','#ff2200','#ffcc00'];
		spark.style.background = colors[Math.floor(Math.random() * colors.length)];
		spark.style.boxShadow = `0 0 ${Math.random()*10+6}px ${spark.style.background}, 0 0 ${Math.random()*20+10}px ${spark.style.background}`;
		sparkContainer.appendChild(spark);
		spark.addEventListener('animationend', () => spark.remove());
		setTimeout(() => { if(spark.parentNode) spark.remove(); }, 2000);
	}

	const fallingEmojis = ['🌸','❤️','✨','💕','🩷','🍀','🐾','💖','🌷','⭐','♡','🦋'];
	function createFallingParticle() {
		const item = document.createElement('div');
		item.className = 'falling-item';
		item.textContent = fallingEmojis[Math.floor(Math.random() * fallingEmojis.length)];
		item.style.left = Math.random() * 95 + '%';
		item.style.setProperty('--fall-duration', (Math.random() * 6 + 7) + 's');
		item.style.setProperty('--fall-size', (Math.random() * 18 + 14) + 'px');
		item.style.setProperty('--fall-rotate', (Math.random() * 360) + 'deg');
		item.style.setProperty('--fall-drift', (Math.random() - 0.5) * 200 + 'px');
		item.style.animationDelay = Math.random() * 0.5 + 's';
		fallingContainer.appendChild(item);
		item.addEventListener('animationend', () => item.remove());
		setTimeout(() => { if(item.parentNode) item.remove(); }, 9000);
	}

	// ==================== 加载指示器 ====================
	function showLoading() {
		loadingOverlay.classList.add('active');
	}
	function hideLoading() {
		loadingOverlay.classList.remove('active');
	}

	// ==================== 页面切换 ====================
	function showCutePage() {
		landingPage.classList.add('exit');
		showLoading();
		setTimeout(() => {
		landingPage.style.display = 'none';
		landingPage.classList.remove('exit');
		cutePage.style.display = 'flex';
		cutePage.classList.add('visible');
		setMode('random', false);
		updateFavicon('🐱');
		window.scrollTo({ top: 0, behavior: 'smooth' });
		hideLoading();
		startParticleLoop();
		}, 500);
	}

	function showLandingPage() {
		cutePage.classList.remove('visible');
		showLoading();
		setTimeout(() => {
		cutePage.style.display = 'none';
		cuteCardsGrid.innerHTML = '';
		landingPage.style.display = 'flex';
		landingPage.style.opacity = '1';
		landingPage.style.transform = 'scale(1)';
		landingPage.style.filter = 'none';
		updateFavicon('🔥');
		window.scrollTo({ top: 0, behavior: 'smooth' });
		hideLoading();
		startParticleLoop();
		}, 400);
	}

	function updateFavicon(emoji) {
		const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>${emoji}</text></svg>`;
		let link = document.querySelector("link[rel='icon']");
		if (!link) {
		link = document.createElement('link');
		link.rel = 'icon';
		document.head.appendChild(link);
		}
		link.href = 'data:image/svg+xml,' + encodeURIComponent(svg);
	}

	enterBtn.addEventListener('click', showCutePage);
	backBtn.addEventListener('click', showLandingPage);
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Enter' && landingPage.style.display !== 'none' && !landingPage.classList.contains('exit')) {
		e.preventDefault(); showCutePage();
		}
		if (e.key === 'Escape' && cutePage.style.display === 'flex' && cutePage.classList.contains('visible')) {
		e.preventDefault(); showLandingPage();
		}
	});

	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (prefersReducedMotion) {
		console.log('检测到减少动画偏好，已关闭粒子效果。');
	}

	function init() {
		landingPage.style.display = 'flex';
		cutePage.style.display = 'none';
		updateFavicon('🔥');
		if (!prefersReducedMotion) {
		startParticleLoop();
		}
	}

	init();

	document.addEventListener('visibilitychange', () => {
		if (document.hidden) {
		stopParticleLoop();
		} else {
		if (!prefersReducedMotion) {
		startParticleLoop();
		}
		}
	});

	console.log('🔥 霸道首页已就绪 — 按 Enter 进入可爱世界，Esc 返回');
	console.log('🐲 动物池27只，随机12只（单击立即刷新），十二生肖完整，气泡已修复');
	})();