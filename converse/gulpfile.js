var gulp = require("gulp");

//1、任务 拷贝 index.html
gulp.task("copy-index", function(){
	return gulp.src("index.html")
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
	// return gulp.src("img/*.jpg").pipe(gulp.dest("dist/images"));

	//拷贝jpg和png图片
	 // return gulp.src("img/*.{jpg,png}").pipe(gulp.dest("dist/images"));

	//拷贝文件夹内的图片
	// return gulp.src("img/*/*").pipe(gulp.dest("dist/images"));

	//拷贝文件和目录下的图片
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

gulp.task("build", ["copy-index", "images", "data","copy-icon",'scripts'], function(){
	console.log("任务执行完毕");
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
	gulp.watch("index.html", ["copy-index"]);
	gulp.watch("img/**/*", ["images"]);
	gulp.watch(['json/*'], ["data"]);
	gulp.watch("stylesheet/index.scss", ['sass']);
    gulp.watch('iconfont/*',['copy-icon']);
	gulp.watch('js/*.js', ["scripts"]);
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
