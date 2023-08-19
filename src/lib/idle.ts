export const main = {
	start: 'idle',

	minFrame: 0,
	maxFrame: 82,

	columnsNumbers: 8,
	rowsNumbers: 11,

	fps: 5,

	src: './idle.png',

	animationList: {
		idle: {
			loop: true,
			startFrame: 1,
			endFrame: 20,
			nextAnimation: 'wand_summon'
		},
		wand_summon: {
			loop: false,
			startFrame: 21,
			endFrame: 48,
			nextAnimation: 'wand_idle'
		},
		wand_idle: {
			loop: true,
			startFrame: 49,
			endFrame: 68,
			nextAnimation: 'wand_hiding'
		},
		wand_hiding: {
			loop: false,
			startFrame: 69,
			endFrame: 82,
			nextAnimation: 'idle'
		}
	}
};
