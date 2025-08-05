document.addEventListener('DOMContentLoaded', function(){
  const navLinks = document.querySelectorAll("#navlink");
  navLinks.forEach(link =>{
    link.addEventListener('click', function(e){
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
                                       
      if(targetSection){
        const navHeight = document.getElementById("navID").offsetHeight;
        const targetPosition = targetSection.offsetTop- navHeight;
                       
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }                                
    });                 
  });                            
     
  const observerOptions={
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries){
    entries.forEach(entry =>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  const animateElements = document.querySelectorAll('.section-title, .text-content, .image-content, .timeline-item');
  animateElements.forEach(element =>{
    observer.observe(element);
  });

  window.addEventListener('scroll', function(){
    const navbar = document.querySelector('nav');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if(scrolled > 100){
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = 'none';
    }
  });

  window.addEventListener('scroll', function(){
    const scrolled = window.pageYOffset;
    const top = document.querySelector('.top');
    const rate = scrolled * -0.1;

    //learned how to do this parallax effect from a video!
    if(top){
      top.style.transform = `translateY(${rate}px)`;
    }
  });

  //transformation for image hover effects
  const placeholderImages = document.querySelectorAll('.placeholder-image');
  placeholderImages.forEach(image =>{
    image.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
      this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
    });
          
    image.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    });
  });  
     
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach((item, index) =>{
    item.style.transitionDelay = `${index * 0.2}s`;
  });    //more parallax/appear on scroll eeffects!             

  //typing effect
  const topTitle = document.querySelector('.top-title');
  if (topTitle) {
    const text = topTitle.textContent;
    topTitle.textContent = '';
    topTitle.style.opacity = '1';
           
    let i = 0;
    const typeWriter = () =>{
      if(i < text.length){
        topTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };
    setTimeout(typeWriter, 1000);
  }
});

//scroll bar at the top of the web page. i watched a video on how to do this
function addScrollProgressIndicator(){
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;    
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #8B4513, #d4a574);
    z-index: 9999;
    transition: width 0.1s ease;
  `;        
         
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () =>{
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent =(scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  });
}

addScrollProgressIndicator();
