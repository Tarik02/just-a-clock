const $container = document.querySelector('.container');
const $time = document.querySelector('.time');
const $day = document.querySelector('.day');
const $date = document.querySelector('.date');

const MONTH_NAMES = [
	'Січня',
	'Лютого',
	'Березня',
	'Квітня',
	'Травня',
	'Червня',
	'Серпня',
	'Вересня',
	'Жовтня',
	'Листопада',
	'Грудня',
];

const WEEK_DAY_NAMES = [
	'Понеділок',
	'Вівторок',
	'Середа',
	'Четвер',
	'П\'ятниця',
	'Субота',
	'Неділя',
];

const modes = [
	'mode-default',
	'mode-green',
	'mode-red',
];

const update = () => {
	const now = new Date();

	$time.innerText = [
		`${now.getHours()}`.padStart(2, '0'),
		`${now.getMinutes()}`.padStart(2, '0'),
		`${now.getSeconds()}`.padStart(2, '0'),
	].join(':');

	$day.innerText = `${WEEK_DAY_NAMES[now.getDay()]}`;
	$date.innerText = `${now.getDate()} ${MONTH_NAMES[now.getMonth()]}`;

	if (navigator && navigator.wakeLock && navigator.wakeLock.request) {
		navigator.wakeLock.request('screen').catch(console.error);
	}
};

const toggleMode = () => {
	$container.classList.remove(modes[modes.length - 1]);
	$container.classList.add(modes[0]);
	modes.push(modes.shift());
};

toggleMode();
update();
setInterval(update, 1000);

document.body.addEventListener('click', () => {
	if (document.fullscreenElement) {
		toggleMode();
	}

	document.body.requestFullscreen();
});

document.body.style.width = '854px';
document.body.style.height = '480px';

document.body.style.transform = `scale(${1 / window.devicePixelRatio})`;
