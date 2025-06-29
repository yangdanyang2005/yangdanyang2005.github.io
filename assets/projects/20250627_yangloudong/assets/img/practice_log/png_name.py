import os

def list_files_to_txt(folder_path):
    """
    读取指定文件夹中的所有文件，将文件名输出到同路径下的txt文件中
    
    参数:
    folder_path: 要扫描的文件夹路径
    """
    try:
        # 检查文件夹是否存在
        if not os.path.exists(folder_path):
            print(f"错误：文件夹 '{folder_path}' 不存在")
            return
        
        if not os.path.isdir(folder_path):
            print(f"错误：'{folder_path}' 不是一个文件夹")
            return
        
        # 获取文件夹中的所有文件（不包括子文件夹）
        files = []
        for item in os.listdir(folder_path):
            item_path = os.path.join(folder_path, item)
            if os.path.isfile(item_path):
                files.append(item)
        
        # 排序文件名
        files.sort()
        
        # 生成输出文件路径
        output_file = os.path.join(folder_path, "文件列表.txt")
        
        # 写入txt文件
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(f"文件夹路径: {folder_path}\n")
            f.write(f"扫描时间: {os.popen('date').read().strip()}\n")
            f.write(f"文件总数: {len(files)}\n")
            f.write("-" * 50 + "\n\n")
            
            for i, filename in enumerate(files, 1):
                f.write(f"{i:3d}. {filename}\n")
        
        print(f"成功！共找到 {len(files)} 个文件")
        print(f"文件列表已保存到: {output_file}")
        
    except Exception as e:
        print(f"发生错误: {str(e)}")

def main():
    """主函数"""
    print("=== 文件列表生成器 ===")
    
    # 方式1: 手动输入路径
    folder_path = input("请输入文件夹路径（直接回车使用当前目录）: ").strip()
    
    # 如果用户没有输入路径，使用当前目录
    if not folder_path:
        folder_path = os.getcwd()
        print(f"使用当前目录: {folder_path}")
    
    # 处理路径中的引号
    folder_path = folder_path.strip('"\'')
    
    # 调用函数
    list_files_to_txt(folder_path)

# 高级版本：支持更多选项
def list_files_advanced(folder_path, include_subdirs=False, file_extensions=None):
    """
    高级版本：支持递归扫描和文件类型过滤
    
    参数:
    folder_path: 要扫描的文件夹路径
    include_subdirs: 是否包括子文件夹中的文件
    file_extensions: 要包含的文件扩展名列表，如 ['.txt', '.py']
    """
    try:
        if not os.path.exists(folder_path):
            print(f"错误：文件夹 '{folder_path}' 不存在")
            return
        
        files = []
        
        if include_subdirs:
            # 递归扫描所有子文件夹
            for root, dirs, filenames in os.walk(folder_path):
                for filename in filenames:
                    # 文件扩展名过滤
                    if file_extensions is None or any(filename.lower().endswith(ext.lower()) for ext in file_extensions):
                        relative_path = os.path.relpath(os.path.join(root, filename), folder_path)
                        files.append(relative_path)
        else:
            # 只扫描当前文件夹
            for item in os.listdir(folder_path):
                item_path = os.path.join(folder_path, item)
                if os.path.isfile(item_path):
                    if file_extensions is None or any(item.lower().endswith(ext.lower()) for ext in file_extensions):
                        files.append(item)
        
        files.sort()
        
        # 生成输出文件名
        output_filename = "文件列表"
        if file_extensions:
            ext_str = "_".join([ext.replace('.', '') for ext in file_extensions])
            output_filename += f"_{ext_str}"
        if include_subdirs:
            output_filename += "_递归"
        output_filename += ".txt"
        
        output_file = os.path.join(folder_path, output_filename)
        
        # 写入文件
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(f"文件夹路径: {folder_path}\n")
            f.write(f"递归扫描: {'是' if include_subdirs else '否'}\n")
            if file_extensions:
                f.write(f"文件类型过滤: {', '.join(file_extensions)}\n")
            f.write(f"文件总数: {len(files)}\n")
            f.write("-" * 50 + "\n\n")
            
            for i, filename in enumerate(files, 1):
                f.write(f"{i:3d}. {filename}\n")
        
        print(f"成功！共找到 {len(files)} 个文件")
        print(f"文件列表已保存到: {output_file}")
        
    except Exception as e:
        print(f"发生错误: {str(e)}")

if __name__ == "__main__":
    main()
    
    # 如果需要使用高级功能，可以取消下面的注释
    """
    print("\n=== 高级选项示例 ===")
    
    # 示例1: 递归扫描所有文件
    # list_files_advanced("C:/your/folder/path", include_subdirs=True)
    
    # 示例2: 只扫描特定类型的文件
    # list_files_advanced("C:/your/folder/path", file_extensions=['.txt', '.py', '.md'])
    
    # 示例3: 递归扫描特定类型文件
    # list_files_advanced("C:/your/folder/path", include_subdirs=True, file_extensions=['.jpg', '.png', '.gif'])
    """
