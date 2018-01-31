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
  els.$img       = $('.js-grow-section')
  els.$panel     = $('.js-hover-grow')
  els.$close     = $('.js-close')
  els.$half      = $('.page__section--half')
  els.$lastName  = els.$close.children()
  els.$container = $('.project')
  els.$prjList   = $('.js-project-list')

  return
}

stretchPanel = (e) =>  {
  let firstHalf  = e.currentTarget.parentElement.parentElement
  let secondHalf = firstHalf.nextSibling
  let container  = firstHalf.parentElement

  $('html, body').animate({
    scrollTop: container.offsetTop
  }, 200)

  firstHalf.classList.toggle('is-stretched')
  secondHalf.classList.toggle('is-small')

  previewMode(container)

  setTimeout(lastNameInFront, 250)

  return
}

shrinkPanel = (e) => {
  let firstHalf  = els.$half.filter('.is-stretched')
  let secondHalf = els.$half.filter('.is-small')

  firstHalf.removeClass('is-stretched')
  secondHalf.removeClass('is-small')

  previewMode(firstHalf.parentElement)

  setTimeout(lastNameInFront, 250)

  return
}

previewMode = (container) => {
  els.$prjList.toggleClass('preview-mode')
  $(container).toggleClass('is-in-view')
  return
}

lastNameInFront = () => {
  els.$close.toggleClass('is-in-front')
  return
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
  });

  return
}

enable = () => {
  if (opts.enabled) return

  // els.$img.on('click', stretchPanel)
  // els.$close.on('click', shrinkPanel)
  els.$panel.on('mousemove', movePanel)
  els.$panel.on('mouseleave', leavePanel)

  opts.enabled = true
  return
}

disable = () => {
  if (!opts.enabled) return

  // els.$img.off('click', stretchPanel)
  // els.$close.off('click', shrinkPanel)
  els.$panel.off('mousemove', movePanel)
  els.$panel.off('mouseleave', leavePanel)

  opts.enabled = false
}

init = () => {
  createChildren()
  enable()
}

document.addEventListener('DOMContentLoaded', init)
