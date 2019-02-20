const isEvent = n => n % 2 === 0;

const RECT_WIDTH = 200;
const RECT_HEIGHT = 50;

const svg = d3.select('svg');
const xOffset =
  (svg.attr('width') / 2) - (RECT_WIDTH / 2);

const rects = [
  {
    index: 0,
    x: xOffset,
    y: 100
  },
  {
    index: 1,
    x: xOffset,
    y: 250
  }
];

const onDragStart = function () {
  d3.select(this)
    .raise()
    .classed('selected', true);
};

const onDrag = function (item) {
  const { x, y } = d3.event;

  d3.select(this).attr(
    'transform',
    `translate(${item.x = x}, ${item.y = y})`
  );

  if (isEvent(item.index)) {
    line.attr('x1', x + RECT_WIDTH / 2);
    line.attr('y1', y + RECT_HEIGHT);
  } else {
    line.attr('x2', x + RECT_WIDTH / 2);
    line.attr('y2', y);
  }
};

const onDragEnd = function () {
  d3.select(this)
    .classed('selected', false);
};

const rectContainers =
  svg.selectAll('g.react-container')
    .data(rects)
    .enter()
    .append('g')
    .attr('class', 'react-container')
    .attr('transform', ({ x, y }) =>
      `translate(${x}, ${y})`
    )
    .call(
      d3.drag()
        .on('start', onDragStart)
        .on('drag', onDrag)
        .on('end', onDragEnd)
    );

rectContainers
  .append('rect')
  .attr('width', RECT_WIDTH)
  .attr('height', RECT_HEIGHT)
  .append('circle');

const line =
  svg.append('line')
    .style('stroke', '#508d99')
    .attr('x1', xOffset + RECT_WIDTH / 2)
    .attr('y1', rects[0].y + RECT_HEIGHT)
    .attr('x2', xOffset + RECT_WIDTH / 2)
    .attr('y2', rects[1].y);
