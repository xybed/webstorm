/**
 * Created by Administrator on 2017/3/16.
 */
window.onload = function () {
    var list = document.getElementById('list');
    var divs = list.children;
    var timer;

    function removeNode(node) {
        node.parentNode.removeChild(node);
    }

    /**
     * 赞的逻辑
     * @param box 一条状态最外层的div，用此div找到"几个人觉得赞"的元素
     * @param el 被点击的元素，改变它的状态（“赞”，“取消赞”）
     */
    function praise(box, el) {
        var praiseTotal = box.getElementsByClassName('praises-total')[0];
        //记住这里要parseInt，不然取出来的是字符串，在后面做加减的时候会变成字符串的操作
        var oldTotal = parseInt(praiseTotal.getAttribute('total'));
        var newTotal;

        if(el.innerHTML == '赞'){
            newTotal = oldTotal + 1;
            praiseTotal.innerHTML = (newTotal == 1) ? '我觉得很赞' : '我和' + oldTotal + '个人觉得很赞';
            el.innerHTML = '取消赞';
        }else{
            newTotal = oldTotal - 1;
            praiseTotal.innerHTML = (newTotal == 0) ? '' : newTotal + '个人觉得很赞';
            el.innerHTML = '赞';
        }
        praiseTotal.setAttribute('total', newTotal);
        praiseTotal.style.display = (newTotal == 0) ? 'none' : 'block';
    }

    /**
     * 回复的逻辑
     * @param box 一条状态最外层的div，用此添加html元素，生成一条回复
     */
    function reply(box) {
        var textarea = box.getElementsByTagName('textarea')[0];
        var commentList = box.getElementsByClassName('comment-list')[0];
        var div = document.createElement('div');
        div.className = 'comment-box clearfix';
        div.setAttribute('user', 'self');
        div.innerHTML = '<img class="myhead" src="images/renren/my.jpg" alt=""/>' +
            '<div class="comment-content">' +
                '<p class="comment-text"><span class="user">我：</span>' + textarea.value + '</p>' +
                '<p class="comment-time">' +
                    getTime() +
                    '<a href="javascript:;" class="comment-praise" total="0" my="0" style="">赞</a>' +
                    '<a href="javascript:;" class="comment-operate">删除</a>' +
                '</p>' +
            '</div>';
        commentList.appendChild(div);
        textarea.value = '';
        textarea.onblur();
    }

    function getTime() {
        var time = new Date();
        var year = time.getFullYear();
        var month = time.getMonth() + 1;
        var date = time.getDate();
        var hour = time.getHours();
        var min = time.getMinutes();
        month = month < 10 ? '0' + month : month;
        date = date < 10 ? '0' + date : date;
        hour = hour < 10 ? '0' + hour : hour;
        min = min < 10 ? '0' + min : min;
        return year + '-' + month + '-' + date + ' ' + hour + ':' + min;
    }

    /**
     * 赞回复
     * @param el 被点击的元素
     */
    function praiseReply(el) {
        var oldTotal = parseInt(el.getAttribute('total'));
        var my = parseInt(el.getAttribute('my'));
        var newTotal;
        if(my == 0){
            //赞
            newTotal = oldTotal + 1;
            el.setAttribute('my', '1');
            el.setAttribute('total', newTotal);
            el.innerHTML = newTotal + ' 取消赞';
        }else{
            //取消赞
            newTotal = oldTotal - 1;
            el.setAttribute('my', '0');
            el.setAttribute('total', newTotal);
            el.innerHTML = newTotal == 0 ? '赞' : newTotal + ' 赞';
        }
        el.style.display = newTotal == 0 ? '' : 'inline-block';
    }

    function commentOperate(el) {
        var commentDiv = el.parentNode.parentNode.parentNode;
        var box = commentDiv.parentNode.parentNode.parentNode;
        var textarea = box.getElementsByTagName('textarea')[0];
        var user = commentDiv.getElementsByClassName('user')[0];
        if(el.innerHTML == '回复'){
            textarea.onfocus();
            textarea.value = '回复' + user.innerHTML;
            textarea.onkeyup();
        }else {
            removeNode(commentDiv);
        }
    }

    for(var i = 0;i<divs.length;i++){
        divs[i].onclick = function (e) {
            e = e || window.event;
            var el = e.srcElement;
            switch (el.className){
                //关闭此条人人状态
                case 'close':
                    removeNode(el.parentNode);
                    break;
                //赞
                case 'praise':
                    praise(el.parentNode.parentNode.parentNode, el);
                    break;
                case 'btn btn-off':
                    clearTimeout(timer);
                    break;
                case 'btn':
                    reply(el.parentNode.parentNode.parentNode);
                    break;
                //赞回复
                case 'comment-praise':
                    praiseReply(el);
                    break;
                //评论的操作
                case 'comment-operate':
                    commentOperate(el);
                    break
            }
        };

        //评论区的功能
        var textarea = divs[i].getElementsByTagName('textarea')[0];
        textarea.onfocus = function () {
            this.parentNode.className = 'text-box text-box-on';
            this.value = (this.value == '评论…') ? '' : this.value;
        };
        textarea.onblur = function () {
            var me = this;
            timer = setTimeout(function () {
                if(me.value == ''){
                    me.parentNode.className = 'text-box';
                    me.value = '评论…';
                }
            }, 200);
        };
        textarea.onkeyup = function () {
            var len = this.value.length;
            var p = this.parentNode;
            var btn = p.children[1];
            var wordLength = p.children[2].getElementsByClassName('length')[0];
            if(len == 0){
                btn.className = 'btn btn-off';
            }else {
                btn.className = 'btn';
            }
            wordLength.innerHTML = len;
        }
    }
};