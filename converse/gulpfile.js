var gulp = require("gulp");

//拷贝 html
gulp.task("copy-html", function(){
	return gulp.src("*.html")
	.pipe(gulp.dest("dist"))
	.pipe(connect.reload());
})
// copy iconfont
gulp.task('copy-icon',function(){
    return gulp.src('iconfont/*')
    .pipe(gulp.dest('dist/iconfont'))
    .pipe(connect.reload());
})
//2、拷贝图片
gulp.task("images", function(){
	return gulp.src("img/**/*")
	.pipe(gulp.dest("dist/images"))
	.pipe(connect.reload());
})

//3、将多个文件拷贝到一个目录下
gulp.task('data', function(){
	return gulp.src(['json/*'])
	.pipe(gulp.dest("dist/json"))
	.pipe(connect.reload());
})

//4、一次性执行多个任务

gulp.task("build", ["copy-html", "images", "data","copy-icon",'scripts','sass-goods','sass-headfoot','sass-goodsmsg','copy-php','sass-shopcart'], function(){
	console.log("任务执行完毕");
})

// copy php文件
gulp.task('copy-php',function(){
    return gulp.src('*.php')
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
})

var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
gulp.task("scripts", function(){
	return gulp.src('js/*.js')
	.pipe(gulp.dest("dist/js"))
	.pipe(connect.reload());
})

//5、监听
gulp.task("watch", function(){

	/*
		两个参数
		第一个参数，监听文件的路径
		第二个参数，执行的任务
	*/
	gulp.watch("*.html", ["copy-html"]);
	gulp.watch("img/**/*", ["images"]);
	gulp.watch(['json/*'], ["data"]);
	gulp.watch("stylesheet/index.scss", ['sass']);
    gulp.watch('iconfont/*',['copy-icon']);
	gulp.watch('js/*.js', ["scripts"]);
    gulp.watch('stylesheet/goods.scss',['sass-goods']);
    gulp.watch('stylesheet/heads.scss',['sass-headfoot']);
    gulp.watch('stylesheet/goodsmsg.scss',['sass-goodsmsg']);
    gulp.watch('*.php',['copy-php']);
    gulp.watch('stylesheet/shopcart.scss',['sass-shopcart']);
})

/*
	gulp插件的使用方式
	1、必须下载该插件 cnpm install 插件名字 --save-dev
					  cnpm i 插件名字 -D
	2、引入该插件  require(插件名字)
	3、使用插件编写代码

*/
var sass = require('gulp-sass-china');
var minifyCSS = require("gulp-minify-css");

gulp.task("sass", function(){
	return gulp.src("stylesheet/index.scss")
	.pipe(sass())
	.pipe(gulp.dest("dist/css"))
	.pipe(minifyCSS())
	.pipe(rename("index.min.css"))
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})
// copy 购物车css
gulp.task("sass-shopcart", function(){
	return gulp.src("stylesheet/shopcart.scss")
	.pipe(sass())
	.pipe(gulp.dest("dist/css"))
	.pipe(minifyCSS())
	.pipe(rename("shopcart.min.css"))
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})
// copy 商品列表页css
gulp.task("sass-goods", function(){
	return gulp.src("stylesheet/goods.scss")
	.pipe(sass())
	.pipe(gulp.dest("dist/css"))
	.pipe(minifyCSS())
	.pipe(rename("goods.min.css"))
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})
// copy headfoot css
gulp.task("sass-headfoot", function(){
	return gulp.src("stylesheet/headfoot.scss")
	.pipe(sass())
	.pipe(gulp.dest("dist/css"))
	.pipe(minifyCSS())
	.pipe(rename("headfoot.min.css"))
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})
// copy 商品详情页 css
gulp.task("sass-goodsmsg", function(){
	return gulp.src("stylesheet/goodsmsg.scss")
	.pipe(sass())
	.pipe(gulp.dest("dist/css"))
	.pipe(minifyCSS())
	.pipe(rename("goodsmsg.min.css"))
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})
var connect = require("gulp-connect");

gulp.task("server", function(){

	//添加实时刷新
	connect.server({
		root: "dist",   //设置服务器的根目录
		livereload: true
	})
})


//启动服务器和监听
/*
	默认任务，不需要写任务名
*/
gulp.task("default", ["watch", "server"]);
