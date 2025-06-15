/**
 * This file documents how the different components of MACHA website
 * integrate with each other to provide a seamless user experience.
 */

// Service Filter to Booking Form Integration
window.presetBookingService = function(serviceName) {
  // This function is called when user clicks "Book Now" on a service card
  // It can be used to pre-populate the booking form with the selected service
  
  // Example implementation:
  const serviceTypeSelect = document.getElementById('serviceType');
  if (serviceTypeSelect) {
    // Find the option that matches or contains the service name
    for (let i = 0; i < serviceTypeSelect.options.length; i++) {
      if (serviceTypeSelect.options[i].text.includes(serviceName)) {
        serviceTypeSelect.selectedIndex = i;
        // Trigger change event to update form dependencies
        serviceTypeSelect.dispatchEvent(new Event('change'));
        break;
      }
    }
  }
};

// Price Calculator to Booking Form Integration
window.setBookingDetails = function(details) {
  // This function is called when user clicks "Book This Service" in price calculator
  
  // Example implementation:
  const serviceTypeSelect = document.getElementById('serviceType');
  const notesField = document.getElementById('notes');
  
  if (serviceTypeSelect) {
    // Map calculator service types to booking form options
    const serviceTypeMapping = {
      'delivery': 'Food Delivery',
      'technician': 'Technician Service',
      'shopping': 'Groceries',
      'event': 'Event Management'
    };
    
    const mappedType = serviceTypeMapping[details.serviceType] || '';
    
    // Select the appropriate service type
    for (let i = 0; i < serviceTypeSelect.options.length; i++) {
      if (serviceTypeSelect.options[i].text === mappedType) {
        serviceTypeSelect.selectedIndex = i;
        serviceTypeSelect.dispatchEvent(new Event('change'));
        break;
      }
    }
  }
  
  if (notesField) {
    // Add price estimate to notes field
    notesField.value = `Estimated price: ₹${details.price} (from calculator)\n${notesField.value}`;
  }
};

// Booking Form to Tracking Integration
window.generateTrackingId = function() {
  // Called after successful booking submission
  // Generates a tracking ID for the user
  
  const prefix = "MACHA";
  const random = Math.floor(100000 + Math.random() * 900000); // 6 digit number
  return `${prefix}${random}`;
};

// Service Areas Map to Booking Form Integration
window.selectAreaForBooking = function(areaName) {
  // Called when user clicks "Book a Service" from area map
  
  const locationField = document.getElementById('location');
  if (locationField) {
    locationField.value = areaName;
  }
  
  // Scroll to booking form using the "Book a Custom Service" button at the bottom
  const bookingSection = document.getElementById('booking');
  if (bookingSection) {
    bookingSection.scrollIntoView({ behavior: 'smooth' });
  }
};

// Custom Book Service function (replacing missing "Book Now" functionality)
window.bookCustomService = function(serviceInfo = {}) {
  // Use this function from any section to navigate to booking form
  // with optional pre-filled information
  
  // First scroll to booking section
  const bookingSection = document.getElementById('booking');
  if (bookingSection) {
    bookingSection.scrollIntoView({ behavior: 'smooth' });
  }
  
  // If service information is provided, pre-fill the form
  if (serviceInfo.type) {
    const serviceTypeSelect = document.getElementById('serviceType');
    if (serviceTypeSelect) {
      // Find and select the matching option
      for (let i = 0; i < serviceTypeSelect.options.length; i++) {
        if (serviceTypeSelect.options[i].value === serviceInfo.type || 
            serviceTypeSelect.options[i].text.includes(serviceInfo.type)) {
          serviceTypeSelect.selectedIndex = i;
          serviceTypeSelect.dispatchEvent(new Event('change'));
          break;
        }
      }
    }
  }
  
  // Add any additional form pre-filling as needed
};

// FAQ to Live Chat Integration
window.askFaqInChat = function(question) {
  // Called when user clicks "Ask in Chat" on a FAQ item
  
  // Open chat widget if not open
  const chatWidget = document.querySelector('.chat-widget');
  if (chatWidget && chatWidget.classList.contains('chat-closed')) {
    // Open chat
    document.querySelector('.chat-toggle-button')?.click();
  }
  
  // Fill question in chat input
  const chatInput = document.querySelector('.chat-input');
  if (chatInput) {
    chatInput.value = question;
  }
};
