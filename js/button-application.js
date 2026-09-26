(function () {
  const BOOST_MS = 3000;
  const button = document.getElementById('application');
  const targetIds = ['2gis', 'Email', 'Max', 'Vk'];
  const links = targetIds
    .map((id) => document.getElementById(id))
    .filter(Boolean); // на случай, если какого-то id ещё нет в разметке

  let timer = null;

  button.addEventListener('click', () => {
    links.forEach((link) => link.classList.add('social_link--boost'));

    clearTimeout(timer);
    timer = setTimeout(() => {
      links.forEach((link) => link.classList.remove('social_link--boost'));
    }, BOOST_MS);
  });
})();