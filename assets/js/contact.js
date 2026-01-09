// 문의하기 폼 처리

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const contactMessage = document.getElementById('contactMessage');
    const charCount = document.getElementById('charCount');
    const formMessage = document.getElementById('formMessage');
    const footerData = {
        contact: {
            email: 'lili9938@naver.com'
        }
    };

    // 글자 수 카운트
    if (contactMessage && charCount) {
        contactMessage.addEventListener('input', function() {
            const currentLength = this.value.length;
            charCount.textContent = currentLength;
            
            if (currentLength > 2000) {
                charCount.style.color = '#dc3545';
                this.value = this.value.substring(0, 2000);
                charCount.textContent = '2000';
            } else if (currentLength > 1800) {
                charCount.style.color = '#ff9800';
            } else {
                charCount.style.color = '#59484F';
            }
        });
    }

    // 폼 제출 처리 (Netlify 폼)
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const subject = document.getElementById('contactSubject').value.trim();
            const message = document.getElementById('contactMessage').value.trim();

            // 유효성 검사
            if (!name || !email || !subject || !message) {
                e.preventDefault();
                showMessage('모든 필수 항목을 입력해주세요.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                e.preventDefault();
                showMessage('올바른 이메일 주소를 입력해주세요.', 'error');
                return;
            }

            if (message.length < 10) {
                e.preventDefault();
                showMessage('문의 내용은 최소 10자 이상 입력해주세요.', 'error');
                return;
            }

            // Netlify 폼이 제출되면 성공 메시지 표시
            // 제출 후 URL에 hash가 추가되거나 리다이렉트가 발생할 수 있음
        });
    }

    // URL 파라미터로 성공/실패 메시지 확인
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        showMessage('문의사항이 성공적으로 전송되었습니다. 빠른 시일 내에 답변 드리겠습니다.', 'success');
        // URL 정리
        window.history.replaceState({}, document.title, window.location.pathname);
    } else if (urlParams.get('success') === 'false') {
        showMessage('문의사항 전송 중 오류가 발생했습니다. 다시 시도해주세요.', 'error');
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    // 이메일 유효성 검사
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // 메시지 표시
    function showMessage(message, type) {
        if (!formMessage) return;
        
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // 스크롤하여 메시지 위치로 이동
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // 5초 후 자동 숨김
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
});

