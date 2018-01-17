// ======================================================================================================
//
// Grow shrink panels
//
// ======================================================================================================

const els = {}
const opts = {
  enabled: false,
  transformFactor: 0.4
}

const scale = (n, min, max) => n * (max - min) + min;
const calculateAngle = (x, y, width, height) => Math.atan2(x - (width / 2), -(y - (height / 2))) * (180 / Math.PI);

createChildren = () => {
  els.$img   = $('.js-grow-section')
  els.$panel = $('.js-hover-grow')
  els.$left  = $('.page__section--first-half')
  els.$right = $('.page__section--second-half')
  els.$lastName = $('.page__section--overflow-txt')
}

stretchPanel = (e) =>  {
  els.$left.toggleClass('is-stretched')
  els.$right.toggleClass('is-small')

  setTimeout(() => {
    els.$lastName.toggleClass('is-in-front')
  }, 400)
}

movePanel = (e) =>  {
  let panelW = els.$panel.width();
  let panelH = els.$panel.height();

  const x       = e.pageX - $(e.currentTarget).offset().left;
  const y       = e.pageY - $(e.currentTarget).offset().top;
  const scaledX = scale(x / panelW, -1, 1);
  const scaledY = scale(y / panelH, -1, 1);
  const maxX    = Math.atan2(15, panelH * .5 * 180 / Math.PI);
  const maxY    = Math.atan2(15, panelW * .5 * 180 / Math.PI);
  const opacity = Math.max(Math.abs(scaledX / maxX), Math.abs(scaledY / maxY));
  const angle   = calculateAngle(x, y, panelW, panelH);

  $(e.currentTarget).css({
    transform: `matrix3d(
      1, 0, ${-scaledX * opts.transformFactor}, 0,
      0, 1, ${-scaledY * opts.transformFactor}, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    )`
    //, backgroundImage: `linear-gradient(${angle}deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, ${opacity * 0.00035}))`,
  });
}

leavePanel = (e) =>  {
  $(e.currentTarget).css({
    transform: `matrix3d(
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    )`
    //, backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0))`,
  });
}

enable = () => {
  if (opts.enabled) return

  els.$img.on('click', stretchPanel)
  els.$panel.on('mousemove', movePanel)
  els.$panel.on('mouseleave', leavePanel)

  opts.enabled = true
}

disable = () => {
  if (!opts.enabled) return

  els.$panel.off('mousemove', movePanel)
  els.$panel.off('mouseleave', leavePanel)

  opts.enabled = false
}

init = () => {
  createChildren()
  enable()
}

document.addEventListener('DOMContentLoaded', init)
