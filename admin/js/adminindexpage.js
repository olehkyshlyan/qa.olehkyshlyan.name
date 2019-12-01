
var BlockUser = new function(){
	
	this.noticeArray = [];
	this.closeNoticeID = [];
	this.blockArray = [];
	
	this.showBlockUserForm = function(th){
		var MBQuestionBlock = jQuery(th).parents("DIV[class*='MBQuestionBlock']");
		if(MBQuestionBlock.length == 1){
			var qbu = MBQuestionBlock.children("DIV[class*='qbu']");
			if(qbu.length == 1){
				var id = qbu.attr("id");
				if(BlockUser.noticeArray.indexOf(id) == -1){
					BlockUser.noticeArray.push(id);
					qbu.slideDown({duration:500});
					var closeNotice = function(){
						var ntArIndex = BlockUser.noticeArray.indexOf(id);
						if(ntArIndex != -1){
							BlockUser.noticeArray.splice(ntArIndex,1);
							qbu.slideUp({duration:500});
						}
					}
					BlockUser.closeNoticeID[id] = setTimeout(closeNotice,5000);
				}
			}
		}
	}
	
	this.hideBlockUserForm = function(th){
		var qbu = jQuery(th).parents("DIV[class*='qbu']");
		if(qbu.length == 1){
			var id = qbu.attr("id");
			var ntArIndex = BlockUser.noticeArray.indexOf(id);
			if(ntArIndex != -1){
				clearTimeout(BlockUser.closeNoticeID[id]);
				BlockUser.noticeArray.splice(ntArIndex,1);
				qbu.slideUp({duration:500});
			}
		}
	}
	
	this.block = function(th){
		var qbu = jQuery(th).parents("DIV[class*='qbu']");
		if(qbu.length == 1){
			var id = qbu.attr("id");
			//alert('id: '+id);
			if(BlockUser.blockArray.indexOf(id) == -1){
				var ntArIndex = BlockUser.noticeArray.indexOf(id);
				if(ntArIndex != -1){
					clearTimeout(BlockUser.closeNoticeID[id]);
					BlockUser.noticeArray.splice(ntArIndex,1);
					qbu.slideUp({duration:500});
				}
				BlockUser.blockArray.push(id);
				var qstUserID = jQuery(th).parents("DIV[class*='MBQuestionBlock']").children("DIV[class*='questionUserID']");
				//alert('qstUserID: '+qstUserID);
				if(qstUserID.length == 1){
					var uid = qstUserID.attr("id");
					//alert('uid: '+uid);
					jQuery.ajax({
						method: "POST",
						url: "admin/blockuser.php",
						data: "uid="+uid,
						success: function(data,textStatus){
							//alert('textStatus: '+textStatus);
							//alert('data: '+data);
						}
					});
					
				}
			}
		}
	}
	
}

jQuery(function(){
	
	jQuery(".iconBlockUser").on('click',function(){
		BlockUser.showBlockUserForm(this);
	});
	
	jQuery(".cancelButtonBlockUserForm").on('click',function(){
		BlockUser.hideBlockUserForm(this);
	});
	
	jQuery(".confirmButtonBlockUserForm").on('click',function(){
		BlockUser.block(this);
	});
	
});


(function(){
  var arr = []; var notice = []; var cqfid = [];
  
  blockuser = function(cid,sid,uid){
    if(arr.indexOf(cid) == -1){
    var ntind = notice.indexOf(cid); if(ntind != -1){ clearTimeout(cqfid[cid]); notice.splice(ntind,1); jQuery('#'+cid).slideUp({duration:500}); }
	  arr.push(cid);
    jQuery.post("blockuser.php","uid="+uid,function(data,textStatus){
	    document.getElementById(sid).innerHTML = data;
      jQuery('#'+sid).slideDown({duration:500,complete:function(){ jQuery('#'+sid).delay(5000).slideUp({duration:500,complete:function(){
		    var ind = arr.indexOf(cid);
        if(ind != -1){ arr.splice(ind,1); }
      }}); }});
	  });
    }
  }
  
  obuform = function(id){
    //alert('id 1: '+id);
    if(notice.indexOf(id) == -1){
	  notice.push(id);
	  jQuery('#'+id).slideDown({duration:500});
	  var closeNotice = function(){
	    var ntind = notice.indexOf(id);
      if(ntind != -1){ notice.splice(ntind,1); jQuery('#'+id).slideUp({duration:500}); }
	  }
	  cqfid[id] = setTimeout(closeNotice,5000);
    }
  }
  
  cbuform = function(id){
    //alert('id 2: '+id);
    var ntind = notice.indexOf(id);
    if(ntind != -1){ clearTimeout(cqfid[id]); notice.splice(ntind,1); jQuery('#'+id).slideUp({duration:500}); }
  }
})();

(function(){
  var arr = []; var notice = []; var cunbfid = [];
  
  unblockuser = function(id){
    if(arr.indexOf(id) == -1){
    var ntind = notice.indexOf(id); if(ntind != -1){ clearTimeout(cunbfid[id]); notice.splice(ntind,1); jQuery('#unb'+id).slideUp({duration:500}); }
	  arr.push(id);
	  jQuery.post("unblockuser.php","uid="+id,function(data,textStatus){
    document.getElementById('unbmsg'+id).innerHTML = data;
		jQuery('#unbmsg'+id).slideDown({duration:500,complete:function(){ jQuery('#unbmsg'+id).delay(5000).slideUp({duration:500,complete:function(){
		  var ind = arr.indexOf(id);
		  if(ind != -1){ arr.splice(ind,1); }
		}}); }});
	  });
	}
  }
  
  ounbuform = function(id){
    if(notice.indexOf(id) == -1){
	  notice.push(id);
	  jQuery('#unb'+id).slideDown({duration:500});
	  var closeNotice = function(){
	    var ntind = notice.indexOf(id);
      if(ntind != -1){ notice.splice(ntind,1); jQuery('#unb'+id).slideUp({duration:500}); }
	  }
	  cunbfid[id] = setTimeout(closeNotice,5000);
    }
  }
  
  cunbuform = function(id){
    //alert('id 2: '+id);
    var ntind = notice.indexOf(id);
    if(ntind != -1){ clearTimeout(cunbfid[id]); notice.splice(ntind,1); jQuery('#unb'+id).slideUp({duration:500}); }
  }
})();

(function(){
  var notice = []; var cqfid = [];
  
  odelform = function(id){
    if(notice.indexOf(id) == -1){
	  //alert('id: '+id);
	  notice.push(id);
	  jQuery('#'+id).slideDown({duration:500});
	  var closeNotice = function(){
	    var ntind = notice.indexOf(id);
      if(ntind != -1){ notice.splice(ntind,1); jQuery('#'+id).slideUp({duration:500}); }
	  }
	  cqfid[id] = setTimeout(closeNotice,5000);
    }
  }
  
  cdelform = function(id){
    var ntind = notice.indexOf(id);
    if(ntind != -1){ clearTimeout(cqfid[id]); notice.splice(ntind,1); jQuery('#'+id).slideUp({duration:500}); }
  }
})();

(function(){
  var arr = []; var notice = []; var cqfid = [];
  
  qremcompl = function(id){
    //alert('id: '+id);
    if(arr.indexOf(id) == -1){
    var ntind = notice.indexOf('qrq'+id); if(ntind != -1){ clearTimeout(cqfid['qrq'+id]); notice.splice(ntind,1); jQuery('#qrq'+id).slideUp({duration:500}); }
	  arr.push(id);
	  jQuery.post("qremcompl.php","id="+id,function(data,textStatus){
	    document.getElementById('msg'+id).innerHTML = data;
		jQuery('#msg'+id).slideDown({duration:500,complete:function(){ jQuery('#msg'+id).delay(5000).slideUp({duration:500,complete:function(){
		  var ind = arr.indexOf(id);
		  if(ind != -1){ arr.splice(ind,1); }
		}}); }});
	  });
	}
  }
  
  oqrcform = function(id){
    //alert('id: '+id);
    if(notice.indexOf(id) == -1){
	  notice.push(id);
    jQuery('#'+id).slideDown({duration:500,complete:function(){
      var closeNotice = function(){
        //alert('close notice');
        var ntind = notice.indexOf(id);
        if(ntind != -1){ notice.splice(ntind,1); jQuery('#'+id).slideUp({duration:500}); }
      }
      cqfid[id] = setTimeout(closeNotice,5000);
      //alert('cqfid[id]: '+cqfid[id]);
    }});
    }
  }
  
  cqrcform = function(id){
    //alert('id: '+id);
    var ntind = notice.indexOf(id);
    if(ntind != -1){ clearTimeout(cqfid[id]); notice.splice(ntind,1); jQuery('#'+id).slideUp({duration:500}); }
  }
})();

(function(){
  var arr = []; var notice = []; var cqfid = [];
  
  aremcompl = function(id){
    if(arr.indexOf(id) == -1){
	  //jQuery('#arq'+id).slideUp({duration:500});
    var ntind = notice.indexOf('arq'+id); if(ntind != -1){ clearTimeout(cqfid['arq'+id]); notice.splice(ntind,1); jQuery('#arq'+id).slideUp({duration:500}); }
	  arr.push(id);
	  jQuery.post("aremcompl.php","id="+id,function(data,textStatus){
    document.getElementById('amsg'+id).innerHTML = data;
		jQuery('#amsg'+id).slideDown({duration:500,complete:function(){ jQuery('#amsg'+id).delay(5000).slideUp({duration:500,complete:function(){
		  var ind = arr.indexOf(id);
		  if(ind != -1){ arr.splice(ind,1); }
		}}); }});
	  });
	}
  }
  
  oarcform = function(id){
    //alert('id: '+id);
    if(notice.indexOf(id) == -1){
	  notice.push(id);
	  jQuery('#'+id).slideDown({duration:500});
	  var closeNotice = function(){
	    var ntind = notice.indexOf(id);
      if(ntind != -1){ notice.splice(ntind,1); jQuery('#'+id).slideUp({duration:500}); }
	  }
	  cqfid[id] = setTimeout(closeNotice,5000);
    //alert('cqfid[id]: '+cqfid[id]);
    }
  }
  
  carcform = function(id){
    var ntind = notice.indexOf(id);
    if(ntind != -1){ clearTimeout(cqfid[id]); notice.splice(ntind,1); jQuery('#'+id).slideUp({duration:500}); }
  }
})();
