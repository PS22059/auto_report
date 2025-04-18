function isInsideHidden(el) {
    return el.closest('[aria-hidden="true"]') !== null;
  }
  
  function randomDelay(min = 1000, max = 2000) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  async function clickByText(text, delay = 2000) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const el = Array.from(document.querySelectorAll('span'))
          .find(span => span.innerText.trim() === text);
        if (el && !isInsideHidden(el)) {
          const btn = el.closest('[role="button"], div[tabindex]');
          if (btn && !isInsideHidden(btn)) {
            btn.click();
            console.log(`✅ Đã click vào: '${text}'`);
          } else {
            el.click();
            console.log(`⚠️ Click trực tiếp vào span: '${text}'`);
          }
          resolve(true);
        } else {
          console.log(`❌ Không tìm thấy hoặc phần tử '${text}' nằm trong aria-hidden`);
          resolve(false);
        }
      }, delay);
    });
  }
  
  async function clickStepsInOrder(steps = [], delay = 2000) {
    for (const step of steps) {
      let clicked = false;
      for (let i = 0; i < 5; i++) {
        const el = Array.from(document.querySelectorAll('span'))
          .find(span => span.innerText.trim() === step);
        if (el && !isInsideHidden(el)) {
          const btn = el.closest('[role="button"], div[tabindex]');
          if (btn && !isInsideHidden(btn)) {
            btn.click();
            console.log(`✅ Đã click vào: '${step}'`);
          } else {
            el.click();
            console.log(`⚠️ Click trực tiếp vào span: '${step}'`);
          }
          clicked = true;
          break;
        }
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      if (!clicked) {
        console.log(`❌ Không tìm thấy nút '${step}' sau khi thử nhiều lần hoặc nằm trong aria-hidden`);
      } else {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  async function reportPostSimple(postIndex) {
    const postActions = document.querySelectorAll('div[aria-label="Hành động với bài viết này"]');
    if (!postActions[postIndex]) {
      console.log(`❌ Không tìm thấy bài viết thứ ${postIndex + 1}`);
      return;
    }
  
    const parent = postActions[postIndex];
    const overlay = parent.querySelector('div[role="none"]');
    if (!overlay || isInsideHidden(overlay)) {
      console.log(`❌ Không tìm thấy nút mở menu hoặc bị ẩn ở bài viết thứ ${postIndex + 1}`);
      return;
    }
  
    const anonymous = parent.querySelector('div[role="button"][tabindex="0"]');
    if (anonymous?.innerText.trim() === "Người tham gia ẩn danh") {
      console.log(`⚠️ Bỏ qua bài viết ${postIndex + 1} vì là 'Người tham gia ẩn danh'`);
      return;
    }
  
    overlay.click();
    console.log(`📌 Đã mở menu bài viết thứ ${postIndex + 1}`);
    await new Promise(resolve => setTimeout(resolve, randomDelay()));
  
    const spans = Array.from(document.querySelectorAll('span')).filter(span =>
      span.innerText.trim() === "Báo cáo bài viết"
    );
  
    const validSpans = spans.filter(span => {
      const container = span.closest('div');
      const text = container?.innerText?.toLowerCase() || '';
      return !text.includes("quản trị viên nhóm") && !isInsideHidden(span);
    });
  
    if (validSpans.length > 0) {
      const el = validSpans[0];
      const btn = el.closest('[role="button"], div[tabindex]');
      if (btn && !isInsideHidden(btn)) {
        btn.click();
        console.log("✅ Đã click vào nút 'Báo cáo bài viết'");
      } else {
        el.click();
        console.log("⚠️ Click trực tiếp vào span 'Báo cáo bài viết'");
      }
    } else {
      console.log("❌ Không tìm thấy nút 'Báo cáo bài viết' phù hợp");
      return;
    }
  
    await new Promise(resolve => setTimeout(resolve, randomDelay()));
  
    const reason1 = await clickByText("Thông tin sai sự thật, lừa đảo hoặc gian lận", randomDelay());
    if (!reason1) return;
  
    await new Promise(resolve => setTimeout(resolve, randomDelay()));
  
    const reason2 = await clickByText("Gian lận hoặc lừa đảo", randomDelay());
    if (!reason2) return;
  
    await new Promise(resolve => setTimeout(resolve, randomDelay()));
    await clickStepsInOrder(["Gửi", "Tiếp", "Xong"], randomDelay());
    
    return true; // Báo cáo thành công
  }
  
  // Hàm mới: Cuộn để tìm các bài viết và xử lý liên tục
  async function continuousReporting(maxReports = 50) {
    console.log(`🔄 Bắt đầu quá trình báo cáo liên tục, tối đa ${maxReports} bài viết`);
    
    let totalProcessed = 0;
    
    while (totalProcessed < maxReports) {
      console.log(`\n📌 Đang tìm bài viết tiếp theo... (đã xử lý: ${totalProcessed}/${maxReports})`);
      
      // Tìm các bài viết hiện tại
      const currentPosts = document.querySelectorAll('div[aria-label="Hành động với bài viết này"]');
      
      // Nếu không có bài viết, cuộn để tìm
      if (currentPosts.length === 0) {
        console.log("⚠️ Không tìm thấy bài viết. Đang cuộn...");
        window.scrollBy({ top: 1000, behavior: 'smooth' });
        await new Promise(resolve => setTimeout(resolve, randomDelay(1500, 2500)));
        
        // Kiểm tra lại sau khi cuộn
        const postsAfterScroll = document.querySelectorAll('div[aria-label="Hành động với bài viết này"]');
        if (postsAfterScroll.length === 0) {
          // Thử cuộn thêm vài lần nữa
          for (let i = 0; i < 3; i++) {
            console.log(`🔍 Nỗ lực cuộn lần ${i + 1}/3...`);
            window.scrollBy({ top: 1200, behavior: 'smooth' });
            
            // Mô phỏng tương tác người dùng
            const hoverZone = document.elementFromPoint(200, 200);
            if (hoverZone) hoverZone.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
            
            await new Promise(resolve => setTimeout(resolve, randomDelay(1800, 2800)));
            
            const postsAfterRetry = document.querySelectorAll('div[aria-label="Hành động với bài viết này"]');
            if (postsAfterRetry.length > 0) {
              console.log(`✅ Tìm thấy ${postsAfterRetry.length} bài viết sau khi cuộn.`);
              break;
            }
          }
        }
      } else {
        console.log(`✅ Đang xử lý bài viết ${totalProcessed + 1}/${maxReports}`);
        
        // Báo cáo bài viết đầu tiên trong danh sách
        const success = await reportPostSimple(0);
        
        if (success) {
          totalProcessed++;
          console.log(`\n✨ Đã báo cáo thành công ${totalProcessed}/${maxReports} bài viết`);
        }
        
        // Cuộn xuống để tìm bài viết tiếp theo
        console.log("🔄 Đang cuộn để tìm bài viết tiếp theo...");
        window.scrollBy({ top: 800, behavior: 'smooth' });
        await new Promise(resolve => setTimeout(resolve, randomDelay(2000, 3000)));
      }
      
      // Nghỉ ngơi giữa các lần báo cáo để giảm nguy cơ bị phát hiện
      await new Promise(resolve => setTimeout(resolve, randomDelay(1000, 2000)));
    }
    
    console.log(`\n🎉 Đã hoàn tất báo cáo ${totalProcessed} bài viết!`);
    return totalProcessed;
  }
  
  (async () => {
    console.log("🚀 Auto Report Script đang chạy (phiên bản liên tục)...");
    
    // Số lượng bài viết tối đa sẽ báo cáo
    const maxReports = 50;
    
    // Khởi chạy quy trình báo cáo liên tục
    await continuousReporting(maxReports);
    
    console.log("\n✨ Quy trình tự động báo cáo đã hoàn tất");
  })();