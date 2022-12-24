export default function json2svg(json) {
	return processLayout(json, 'xmlns="http://www.w3.org/2000/svg"');
}

const colours = {
	lr: '#f77',
	dr: '#700',

	lo: '#fd7',
	do: '#b70',

	ly: '#ff7',
	dy: '#770',

	lg: '#7f7',
	dg: '#070',

	lt: '#7ff',
	dt: '#077',

	lb: '#bbf',
	db: '#007',

	li: '#f7f',
	di: '#707',

	lv: '#d7f',
	dv: '#b07',

	g0: '#000',
	g1: '#111',
	g2: '#222',
	g3: '#333',
	g4: '#444',
	g5: '#555',
	g6: '#666',
	g7: '#777',
	g8: '#888',
	g9: '#999',
	ga: '#aaa',
	gb: '#bbb',
	gc: '#ccc',
	gd: '#ddd',
	ge: '#eee',
	gf: '#fff',
	x: 'transparent',
};

const joinElements = (elementArray = [], mapFunctor) =>
	elementArray.map(element => mapFunctor(element)).join('');

function processLayout(layout = {}, ns = '') {
	const { x = 0, y = 0, width = 0, height = 0 } = layout;

	return `<svg ${ns} x="${x}" y="${y}" height="${height}" width="${width}">
	${joinElements(layout.layouts, processLayout)}
	${joinElements(layout.diagrams, processDiagram)}
</svg>`;
}

function processDiagram(diagram = {}) {
	const shapes = {
		circle: _ => {
			const { cx = 0, cy = 0, r = 0, fc = 'x' } = _;
			return `<circle cx=${cx} cy=${cy} r=${r} fill="${colours[fc]}" />`;
		},
		ellipse: _ => {
			const {
				cx = 0,
				cy = 0,
				rx = 0,
				ry = 0,
				fc = 'x',
				ra = 0,
				tx = 0,
				ty = 0,
			} = _;
			return `<ellipse cx=${cx} cy=${cy} rx=${rx} ry=${ry} fill="${
				colours[fc]
			}" transform="rotate(${ra} ${tx || cx} ${ty || cy})" />`;
		},
		rectangle: _ => {
			const {
				x = 0,
				y = 0,
				w = 0,
				h = 0,
				rx = 0,
				fc = 'x',
				sc = 'x',
				ra = 0,
				tx = 0,
				ty = 0,
			} = _;
			return `<rect x=${x} y=${y} width=${w} height=${h} rx="${rx}" fill="${
				colours[fc]
			}" stroke="${colours[sc]}" transform="rotate(${ra} ${tx || x + w / 2} ${
				ty || y + h / 2
			})" />`;
		},
		regular: _ => {
			const {
				cx = 0,
				cy = 0,
				r = 0,
				s = 3,
				fc = 'x',
				sc = 'x',
				ra = 0,
				tx = 0,
				ty = 0,
			} = _;
			const RADIANS = Math.PI * 2;
			const points = new Array(s)
				.fill(1)
				.map((_, point) => {
					const angle = (RADIANS * point) / s;
					return `${cx - r * Math.sin(angle)},${cy - r * Math.cos(angle)}`;
				})
				.join(' ');
			return `<polygon points="${points}" fill="${
				colours[fc]
			}" transform="rotate(${ra} ${tx || cx} ${ty || cy})" stroke="${
				colours[sc]
			}" />`;
		},
		polygon: _ => {
			const centre = ps => {
				const min = Math.min(...ps);
				return (Math.max(...ps) - min) / 2 + min;
			};
			const { p = [], fc = 'x', sc = 'x', ra = 0 } = _;
			const tx = centre(p.map(({ x }) => x));
			const ty = centre(p.map(({ y }) => y));
			const points = p.map(({ x, y }) => `${x},${y}`).join(' ');
			return `<polygon points="${points}" fill="${colours[fc]}" stroke="${colours[sc]}" transform="rotate(${ra} ${tx} ${ty})" />`;
		},
		polyline: _ => {
			const centre = ps => {
				const min = Math.min(...ps);
				return (Math.max(...ps) - min) / 2 + min;
			};
			const { p = [], sc = 'x', ra = 0 } = _;
			const tx = centre(p.map(({ x }) => x));
			const ty = centre(p.map(({ y }) => y));
			const points = p.map(({ x, y }) => `${x},${y}`).join(' ');
			return `<polyline points="${points}" fill="none" stroke="${colours[sc]}" transform="rotate(${ra} ${tx} ${ty})" />`;
		},
		text: _ => {
			const { x = 0, y = 0, r = 0, fc = 'g0', text = '', ta = 'c' } = _;
			const textAnchor = {
				l: 'start',
				c: 'middle',
				r: 'end',
			};
			return `<text x=${x} y=${y} fill="${colours[fc]}" text-anchor="${textAnchor[ta]}" >${text}</text>`;
		},
	};
	return shapes[diagram.shape](diagram);
}
