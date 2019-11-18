// convert elapsed time in second to "HH:MM:SS"
function to_time(seconds) {
  if (!Number.isNaN(seconds)) {
    var dt = new Date(null);
    dt.setSeconds(seconds); 
    return dt.toISOString().substr(11, 8);
  } else {
    return '--:--:--';
  }
}

// convert elapsed time or pace in "HH:MM:SS" format to timve value in second
function to_seconds(t) {
  return t.split(':').reduce((p,c) => p * 60 + +c, 0); 
}

function item(e) {
  var r = {no: e.no.slice(1), order: e.order, name: e.name, result: e.result, moveup: e.moveup, members: []}
  
  for (var i in [1,2,3,4,5]) {
    var k = +i +1,
		m = {
			no: k,
			duration: e[k]
		},
        s = to_seconds(m.duration); 
    
    m.pace = to_time(s/(i>0 ? 8.8 : 4.4)).slice(3);
    m['adjusted-pace'] = to_time( s/(i>0 ? 8.8 : 4.4/1.05)).slice(3);
    if (e.memo == '全女性') {
		m.gender = 'F';
	} else if ( k == 1 ) {
		if (e.delay) {
			m.gender = 'M';
			m.delay  = '05:00';
        } else {
			m.gender = 'F';
        }
    } else {
		m.gender = 'M';
	}
    r.members.push(m);
  }
  return r;
}

var arr = JSON.parse(``);
JSON.stringify(arr.map(e => item(e)), null, '  ');
