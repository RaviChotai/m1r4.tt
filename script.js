$(document).ready(function() {
    // Sample user database (in real app, this would be server-side)
    let userDatabase = [
        {
            firstName: "Keisha",
            lastName: "Mohammed",
            email: "keisha@email.com",
            location: "Port of Spain",
            interests: "Carnival Fashion",
            joinDate: "2024-01-15"
        },
        {
            firstName: "Marcus",
            lastName: "Williams",
            email: "marcus@email.com",
            location: "San Fernando",
            interests: "Urban Street",
            joinDate: "2024-01-20"
        },
        {
            firstName: "Priya",
            lastName: "Singh",
            email: "priya@email.com",
            location: "Scarborough",
            interests: "Beach Wear",
            joinDate: "2024-01-25"
        },
        {
            firstName: "Andre",
            lastName: "Baptiste",
            email: "andre@email.com",
            location: "Chaguanas",
            interests: "All Collections",
            joinDate: "2024-02-01"
        },
        {
            firstName: "Samantha",
            lastName: "Chen",
            email: "sam@email.com",
            location: "International",
            interests: "Traditional Wear",
            joinDate: "2024-02-05"
        }
    ];

    // Display users function
    function displayUsers(usersToShow = userDatabase) {
        const userDisplay = $('#userDisplay');
        userDisplay.empty();
        
        if (usersToShow.length === 0) {
            userDisplay.html('<p style="text-align: center; color: #666;">No community members found for this filter.</p>');
            return;
        }

        usersToShow.forEach(function(user, index) {
            const userCard = $(`
                <div class="user-card" style="animation: fadeInUp 0.5s ease-out ${index * 0.1}s both;">
                    <h4>${user.firstName} ${user.lastName}</h4>
                    <p><strong>Location:</strong> ${user.location}</p>
                    <p><strong>Interests:</strong> ${user.interests}</p>
                    <p><strong>Member since:</strong> ${new Date(user.joinDate).toLocaleDateString()}</p>
                </div>
            `);
            userDisplay.append(userCard);
        });
    }

    // Update member count
    function updateMemberCount() {
        $('#memberCount').text(userDatabase.length);
    }

    // Initialize displays
    displayUsers();
    updateMemberCount();

    // Modal functionality
    const modal = $('#registrationModal');
    const joinBtns = $('#joinBtn, #joinCommunityBtn');
    const closeBtn = $('.close');

    // Open modal
    joinBtns.click(function() {
        modal.fadeIn(300);
    });

    // Close modal
    closeBtn.click(function() {
        modal.fadeOut(300);
    });

    // Close modal when clicking outside
    $(window).click(function(event) {
        if (event.target === modal[0]) {
            modal.fadeOut(300);
        }
    });

    // Form submission
    $('#userForm').submit(function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            email: $('#email').val(),
            location: $('#location').val(),
            interests: $('#interests').val(),
            joinDate: new Date().toISOString().split('T')[0]
        };

        // Check if email already exists
        const emailExists = userDatabase.some(user => user.email === formData.email);
        if (emailExists) {
            alert('This email is already registered! Welcome back to M1R4! 👋');
            return;
        }

        // Add to database
        userDatabase.push(formData);
        
        // Success animation and feedback
        const submitBtn = $('.submit-btn');
        submitBtn.text('Welcome to M1R4! 🎉').css('background', 'linear-gradient(45deg, #28a745, #20c997)');
        
        setTimeout(function() {
            // Reset form
            $('#userForm')[0].reset();
            submitBtn.text('Join M1R4 Community').css('background', 'linear-gradient(45deg, #667eea, #764ba2)');
            
            // Close modal
            modal.fadeOut(300);
            
            // Update displays
            displayUsers();
            updateMemberCount();
            
            // Show welcome message
            setTimeout(function() {
                alert(`Welcome to the M1R4 family, ${formData.firstName}! 🇹🇹`);
            }, 500);
        }, 2000);
    });

    // Product filtering
    $('.filter-btn').click(function() {
        const filter = $(this).data('filter');
        
        // Update active button
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        // Filter products
        if (filter === 'all') {
            $('.product-card').fadeIn(300);
        } else {
            $('.product-card').each(function() {
                const category = $(this).data('category');
                if (category === filter) {
                    $(this).fadeIn(300);
                } else {
                    $(this).fadeOut(300);
                }
            });
        }
    });

    // Community filtering
    $('.community-filters .filter-btn').click(function() {
        const filter = $(this).data('filter');
        
        // Update active button
        $('.community-filters .filter-btn').removeClass('active');
        $(this).addClass('active');
        
        // Filter users
        if (filter === 'all') {
            displayUsers(userDatabase);
        } else {
            const filteredUsers = userDatabase.filter(user => user.location === filter);
            displayUsers(filteredUsers);
        }
    });

    // Product card interactions
    $('.product-card').click(function() {
        const productName = $(this).find('h3').text();
        const price = $(this).find('.product-price').text();
        
        // Animate the card
        $(this).addClass('animate__pulse');
        setTimeout(() => {
            $(this).removeClass('animate__pulse');
        }, 600);
        
        alert(`${productName} - ${price}\n\nThis would normally take you to the product page! 🛍️\n\nJoin our community to get notified when our online store launches!`);
    });

    // Product button clicks
    $('.product-btn').click(function(e) {
        e.stopPropagation();
        const productName = $(this).closest('.product-card').find('h3').text();
        alert(`${productName} details coming soon! 🛍️`);
    });

    // Smooth scrolling for anchor links
    $('a[href^="#"]').click(function(e) {
        e.preventDefault();
        const target = $($(this).attr('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800);
        }
    });

    // Add hover effects to product cards
    $('.product-card').hover(
        function() {
            $(this).find('.product-image').css('transform', 'scale(1.05)');
        },
        function() {
            $(this).find('.product-image').css('transform', 'scale(1)');
        }
    );

    // Floating animation for hero elements (only on home page)
    if ($('.hero').length) {
        setInterval(function() {
            $('.floating-element').each(function(index) {
                const randomX = Math.random() * 20 - 10;
                const randomY = Math.random() * 20 - 10;
                $(this).css('transform', `translate(${randomX}px, ${randomY}px)`);
            });
        }, 3000);
    }

    // Add scroll effects
    $(window).scroll(function() {
        const scrollTop = $(window).scrollTop();
        const windowHeight = $(window).height();
        
        // Parallax effect for hero (only on home page)
        if ($('.hero').length) {
            $('.hero-content').css('transform', `translateY(${scrollTop * 0.5}px)`);
        }
        
        // Fade in elements on scroll
        $('.product-card, .about-text, .story-card, .value-item').each(function() {
            const elementTop = $(this).offset().top;
            if (scrollTop + windowHeight > elementTop + 100) {
                $(this).css('opacity', '1').css('transform', 'translateY(0)');
            }
        });
    });

    // Initialize scroll effects
    $('.product-card, .about-text, .story-card, .value-item').css({
        'opacity': '0',
        'transform': 'translateY(30px)',
        'transition': 'all 0.6s ease-out'
    });

    // Animate stats counter (only on community page)
    if ($('#memberCount').length) {
        function animateCounter() {
            const target = userDatabase.length;
            let current = 0;
            const increment = target / 30;
            const timer = setInterval(function() {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                $('#memberCount').text(Math.floor(current));
            }, 50);
        }
        
        // Trigger animation when page loads
        setTimeout(animateCounter, 500);
    }
});