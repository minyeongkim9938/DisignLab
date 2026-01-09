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
    // Netlify가 기본적으로 폼을 처리하므로 JavaScript는 최소한으로 개입
    if (contactForm) {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        let originalButtonText = '문의하기';
        if (submitButton) {
            originalButtonText = submitButton.textContent;
        }

        // 폼 제출 처리 - Netlify가 자동으로 처리하도록 함
        // HTML5 validation이 먼저 실행되므로 여기서는 로딩 상태만 관리
        contactForm.addEventListener('submit', function(e) {
            // HTML5 validation이 통과했는지 확인
            if (!contactForm.checkValidity()) {
                // HTML5 validation 실패 시 브라우저 기본 동작 허용
                return true;
            }

            // 모든 검증 통과 시 로딩 상태만 표시
            // Netlify가 폼을 자동으로 처리하므로 preventDefault()를 호출하지 않음
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = '전송 중...';
                
                // 폼 제출이 완료되지 않는 경우를 대비해 타임아웃 설정
                setTimeout(function() {
                    if (submitButton && submitButton.disabled) {
                        submitButton.disabled = false;
                        submitButton.textContent = originalButtonText;
                    }
                }, 15000);
            }
            
            // Netlify가 자동으로 폼을 처리함
            // preventDefault()를 호출하지 않으므로 폼이 정상적으로 제출됨
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

