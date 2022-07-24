function appendHtml(el, str) {
  const div = document.createElement('div');
  div.innerHTML = str;
  while (div.children.length > 0) {
    el.appendChild(div.children[0]);
  }
}

window.addEventListener('load', function() {
  // const localStoreFilter = async () => {
  //   const { value } = document.querySelector('.select_month');
  //   localStorage.setItem('filter', value);
  // };
  // this.window.sessionStorage.setItem('clickEvent', localStoreFilter);
  // function testc() {
  //   console.log('aaa');
  // }
  // this.window.sessionStorage.getItem('month')
  // const test =
  //   '<select class="select_month form-control"><option value="">Select Month</option><option value="01">Jan</option><option value="02">Feb</option><option value="3">Mrch</option><option value="4">Aprl</option><option value="5">May</option><option value="6">June</option><option value="7">July</option><option value="8">Aug</option><option value="9">Sep</option><option value="10">Oct</option><option value="11">Nov</option><option value="12">Dec</option></select>';
  // // const test1 = '<button onclick="localStorage()">Go to date</button>';
  // const val = document.querySelectorAll('.fc-toolbar-chunk')[2];
  // appendHtml(val, test);
  // appendHtml(val, test1);
});
