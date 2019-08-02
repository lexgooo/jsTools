/**
 * @description 根据指定文件夹新建和写入或更新 vue 项目的 router 文件
 * @dependencies 需要安装 yarg 模块
 * @argv 
 *  @path (--path): 页面所在文件夹
 *  @output (--output): 输出的文件路径
 * 
 * 查找path文件夹下的所有 vue 文件，如果有子文件夹 遍历子文件夹，
 * 需要取出子文件夹中的 index.vue 及和子文件夹名字相同的 vue 文件，
 * 只遍历一级子文件。
 */

