var terms;
var usingLocalFallback = false;

var loadLocalFallback = function() {
	if (usingLocalFallback) return;
	usingLocalFallback = true;
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "gcd_dict_all_with_note.json", true);
	xhr.onload = function() {
		if (xhr.status === 200) {
			try {
				terms = JSON.parse(xhr.responseText);
				console.log("已從本地辭典載入 " + (terms ? terms.length : 0) + " 條目");
			} catch (e) {
				console.error("本地辭典解析失敗:", e);
			}
		}
	};
	xhr.onerror = function() {
		console.error("無法載入本地辭典");
	};
	xhr.send();
};

var db = new Firebase('https://treasuredict.firebaseio.com/');
db.on("value", function(snapshot) {
	terms = snapshot.val();
}, function (errorObject) {
	console.log("Firebase 讀取失敗，改用本地辭典: " + errorObject.code);
	loadLocalFallback();
});

// 若 8 秒後仍未載入，嘗試使用本地辭典
setTimeout(function() {
	if (terms === undefined) {
		console.log("Firebase 逾時，改用本地辭典");
		loadLocalFallback();
	}
}, 8000);


var saveEdited=function(obj,p){
	if (usingLocalFallback) {
		alert("ད་ལྟ་ས་གནས་ཚིག་མཛོད་བེད་སྤྱོད་བྱེད་བཞིན་པས་བཟོ་བཅོས་ཉར་ཚགས་མི་ཐུབ། Firebase གཞུང་ལུགས་སྒྲིག་གནང་རོགས། 目前使用本地辭典，無法儲存修改。請設定有效的 Firebase 以啟用編輯功能。");
		return;
	}
	db.child(p).set(obj);
	terms[p]=obj;
}

var saveNewEntry=function(obj,p){
	if (usingLocalFallback) {
		alert("ད་ལྟ་ས་གནས་ཚིག་མཛོད་བེད་སྤྱོད་བྱེད་བཞིན་པས་གསར་འཇུག་མི་ཐུབ། Firebase གཞུང་ལུགས་སྒྲིག་གནང་རོགས། 目前使用本地辭典，無法新增條目。請設定有效的 Firebase 以啟用編輯功能。");
		return;
	}
	console.log(obj,p);
	var entry={};
	entry[p]=obj;
	db.update(entry);
	terms[p]=obj;
}