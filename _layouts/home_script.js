document.addEventListener('DOMContentLoaded', function () {
    const texts = [
      "天行健，君子以自强不息；地势坤，君子以厚德载物。",
      "高山仰止，景行行止。",
      "蒹葭苍苍，白露为霜。",
      "昔我往矣，杨柳依依。今我来思，雨雪霏霏。",
      "天何所沓？十二焉分？日月安属？列星安陈？",
      "知天之所为，知人之所为者，至矣。",
      "天地玄黄，宇宙洪荒。日月盈昃，辰宿列张。",
      "道生一，一生二，二生三，三生万物。",
    ];

    let currentTextIndex = 0;
    let currentCharIndex = 0;
    const typingSpeed = 150; // 打字速度（毫秒）
    const eraseSpeed = 50; // 删除速度（毫秒）
    const typingEffectContainer = document.getElementById("typing-effect-container");

    function typeText() {
      const currentText = texts[currentTextIndex];
      typingEffectContainer.textContent = currentText.substring(0, currentCharIndex + 1);
      currentCharIndex++;

      if (currentCharIndex < currentText.length) {
        setTimeout(typeText, typingSpeed);
      } else {
        setTimeout(eraseText, 1000); // 打字完毕后等待一段时间，然后开始删除
      }
    }

    function eraseText() {
      const currentText = texts[currentTextIndex];
      typingEffectContainer.textContent = currentText.substring(0, currentCharIndex - 1);
      currentCharIndex--;

      if (currentCharIndex >= 0) {
        setTimeout(eraseText, eraseSpeed);
      } else {
        currentTextIndex = (currentTextIndex + 1) % texts.length; // 循环播放文本
        setTimeout(typeText, 500); // 等待一段时间后再开始打字
      }
    }

    typeText(); // 开始打字效果

    // 调用背景图加载和更新
    loadBackgroundImages();
  });

// 加载并循环显示背景图片
function loadBackgroundImages() {
  const folderPath = "images/home_page/"; // 图片文件夹路径
  const imageFiles = [
    "img1.png", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg", "img6.jpg", "img7.jpg", "img8.png" // 替换为文件夹下的图片文件名
  ];

  let currentImageIndex = 0;
  const typingEffectContainer = document.getElementById("typing-effect-container");

  function updateBackgroundImage() {
  typingEffectContainer.style.backgroundImage = `url('${folderPath}${imageFiles[currentImageIndex]}')`;
  currentImageIndex = (currentImageIndex + 1) % imageFiles.length; // 循环图片

  // 计算并设置文字颜色为背景图的对比色
  const img = new Image();
  img.src = `${folderPath}${imageFiles[currentImageIndex]}`;
  img.onload = function () {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);
    
    // 只取图像的上1/3部分
    const cropHeight = Math.floor(img.height / 3);
    const imgData = ctx.getImageData(0, 0, img.width, cropHeight); // 截取上1/3部分的像素数据
    
    let r = 0, g = 0, b = 0;
    const pixelCount = imgData.width * imgData.height;
    for (let i = 0; i < pixelCount; i++) {
      r += imgData.data[i * 4];
      g += imgData.data[i * 4 + 1];
      b += imgData.data[i * 4 + 2];
    }
    r = Math.floor(r / pixelCount);
    g = Math.floor(g / pixelCount);
    b = Math.floor(b / pixelCount);

    // 计算亮度
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    // 根据亮度选择适当的文字颜色
    const contrastColor = luminance > 128 ? '#000' : '#fff'; // 亮度大于128选择黑色，反之选择白色
    document.documentElement.style.setProperty('--typing-text-color', contrastColor);
    document.documentElement.style.setProperty('--typing-cursor-color', contrastColor); // 设置光标颜色
  };
}


  updateBackgroundImage(); // 初始化显示第一张图片
  setInterval(updateBackgroundImage, 5000); // 每5秒更新一次背景图片
}


    // 网站运行计时器
    const siteStartTime = new Date('2024-11-07T16:04:00'); // 网站启动时间
  const runTimerElement = document.getElementById("run-timer");

  function updateRunTime() {
    const currentTime = new Date();
    const elapsedTime = currentTime - siteStartTime;
    const days = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((elapsedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    
    runTimerElement.textContent = `${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒`;
  }

  setInterval(updateRunTime, 1000); // 每秒更新一次运行时间

  // 网站访问计数器
  const visitCountElement = document.getElementById("visit-count");
  
  // // 模拟访问次数，这里你可以用真实的 API 或者计数器服务来更新访问次数
  // let visitCount = 12345; // 示例访问次数
  // visitCountElement.textContent = visitCount;

  // 如果你需要从服务器获取实际的访问数据，可以使用类似的代码：
  fetch('/api/get-visit-count')
    .then(response => response.json())
    .then(data => {
      visitCount = data.visitCount;
      visitCountElement.textContent = visitCount;
    });

  // 音乐播放器
  document.addEventListener('DOMContentLoaded', function () {
  const audioPlayer = document.getElementById('audio-player');
  // 自动播放
  audioPlayer.autoplay = true;
  // 循环播放
  audioPlayer.loop = true;
});