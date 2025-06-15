import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Filter, CameraOff, ZoomIn, Download, Share2, Heart } from 'lucide-react';

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [hoveredImageId, setHoveredImageId] = useState(null);
  const [likedImages, setLikedImages] = useState([]);
  const [showImageActions, setShowImageActions] = useState(false);
  const carouselRef = useRef(null);
  const controls = useAnimation();

  // Load images with a slight delay to show skeleton state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Handle keyboard navigation in modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      switch (e.key) {
        case 'ArrowRight':
          navigateImage('next');
          break;
        case 'ArrowLeft':
          navigateImage('prev');
          break;
        case 'Escape':
          closeModal();
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  // Reset currentIndex when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [currentCategory]);

  // Animate gallery section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        }
      },
      { threshold: 0.1 }
    );
    const section = document.getElementById('gallery');
    if (section) observer.observe(section);
    return () => {
      if (section) observer.unobserve(section);
    };
  }, [controls]);

  // Gallery images
  const galleryImages = [
    {
      id: 1,
      src: "https://media.istockphoto.com/id/1287632111/photo/weve-got-you-covered-during-lockdown.jpg?s=612x612&w=0&k=20&c=7tP1pfzLUEWHnDv-Sb8Gc_4NepfpUV5aG_Z4P_3DJ80=",
      alt: "Food Delivery Service",
      category: "delivery",
      featured: true
    },
    {
      id: 2,
      src: "https://media.istockphoto.com/id/1049775258/photo/smiling-handsome-electrician-repairing-electrical-box-with-pliers-in-corridor-and-looking-at.jpg?s=612x612&w=0&k=20&c=stdWozouV2XsrHk2xXD3C31nT90BG7ydZvcpAn1Fx7I=",
      alt: "Electrician fixing wiring",
      category: "technicians",
      featured: true
    },
    {
      id: 3,
      src: "https://media.istockphoto.com/id/1310546468/photo/farmer-holds-a-box-of-vegetables-autumn-harvest.jpg?s=612x612&w=0&k=20&c=zHzAQ4Qf8FfAKbtpYd_ZiHY5yV4NarW0T_QT3pDCKdM=",
      alt: "Organic vegetable delivery",
      category: "delivery"
    },
    {
      id: 4,
      src: "https://imgs.search.brave.com/QHTcYGnL_XKfb2OuO4JFWR6ta4uiabcKbcA3qty2lHk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTgy/OTM5MTExL3Bob3Rv/L2J1c2luZXNzd29t/YW4tdXNpbmctdGFi/bGV0LWNvbXB1dGVy/LWluLWRpbmluZy1y/b29tLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz14Yy1PTFVK/SUhPMVlCd21QYWw5/aHk3cEJ1bGRBSWlp/NWlrZWdaXzZsV29N/PQ",
      alt: "Wedding event management",
      category: "events",
      featured: true
    },
    {
      id: 5,
      src: "https://media.istockphoto.com/id/846843298/photo/handsome-male-and-beautiful-female-mobile-application-designers-test-and-discuss-new-app.jpg?s=612x612&w=0&k=20&c=TBkj7DJKpMQZYIKRmgAJ2-Bk5TK4244yncXKRmKzBSE=",
      alt: "Mobile app development",
      category: "software"
    },
    {
      id: 6,
      src: "https://imgs.search.brave.com/Gguq05JCav3L7dkh8f_yqIcFM6DLgEUYihA2Z2u6mhg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jYXJh/dmFuLXRydWNrcy1j/YXJnby10cmFuc3Bv/cnRhdGlvbi1jb25j/ZXB0LTIzNTc2MjAx/LmpwZw",
      alt: "Transport and logistics services",
      category: "transport"
    },
    {
      id: 7,
      src: "https://tutorax.com/wp-content/uploads/2022/10/Elementory-school-student-doing-tutoring-session-with-her-teacher-in-a-classroom.jpeg",
      alt: "Home tutoring service",
      category: "education"
    },
    {
      id: 8,
      src: "https://imgs.search.brave.com/e7HnfHDFhPhwgsFyQl79a_c-8YTEIk8PWD5vVThZpS0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAzLzQ3Lzc5LzE2/LzM2MF9GXzM0Nzc5/MTY0OF9FMzU5RE1r/eG9OS0hXYWhxS0c3/SXFZM21GRlU1Uzdq/Vy5qcGc",
      alt: "Sanitization services",
      category: "sanitization"
    },
    {
      id: 9,
      src: "https://imgs.search.brave.com/uDji8GjUoRjYhBF-EIJv1GN4EISV29EUzuas2Intw9w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9ob21l/LWhlYWx0aC1jYXJl/LW51cnNlLWFzc2lz/dGluZy1lbGRlcmx5/LXBhdGllbnQtaGlz/LWhvdXNlLTE0NzA0/MTU5OS5qcGc",
      alt: "Medical services",
      category: "medical"
    },
    {
      id: 10,
      src: "https://i.pinimg.com/736x/28/a5/da/28a5dafa2cd5766f1f561a7def843abc.jpg",
      alt: "Lunch Box delivery",
      category: "delivery"
    },
    {
      id: 11,
      src: "https://imgs.search.brave.com/HDNhy-nvHgyXyCYdz6eTnC7zTVEgGSFXH3s1dfP-zrs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9wbHVtYmVyLXVu/aWZvcm0tc2hvd2Nh/c2UtcGx1bWJlcmlu/Zy1zdG9yZS1tYW4t/d2l0aC1ub3RlYm9v/ay1idXlpbmctc2Fu/aXRhcnktZW5naW5l/ZXJpbmctc2hvcC13/YXRlci10YXBzLWZh/dWNldHMtY2hvaWNl/XzI2NjczMi0yMTg1/OC5qcGc_c2VtdD1h/aXNfaHlicmlkJnc9/NzQw",
      alt: "Plumbing services",
      category: "technicians"
    },
    {
      id: 12,
      src: "https://imgs.search.brave.com/ScXQ-P3I9YA9cMf-pRE49HQ6PgE8eFN_lrZBUo2hF_8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9iaXJ0aGRheS1v/dXRkb29yLWJlZm9y/ZS1wYXJ0eS1iYWxs/b29ucy1jYWtlXzU3/NjczOS0xMzQuanBn/P3NlbXQ9YWlzX2h5/YnJpZCZ3PTc0MA",
      alt: "Birthday party planning",
      category: "events"
    }
  ];

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'delivery', name: 'Delivery' },
    { id: 'technicians', name: 'Technicians' },
    { id: 'events', name: 'Events' },
    { id: 'software', name: 'Software' },
    { id: 'transport', name: 'Transport' },
    { id: 'education', name: 'Education' },
    { id: 'sanitization', name: 'Sanitization' },
    { id: 'medical', name: 'Medical' }
  ];

  const filteredImages = currentCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === currentCategory);

  // Modal and carousel logic
  const openModal = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };
  const navigateImage = (direction) => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredImages.length;
    } else {
      newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    }
    setSelectedImage(filteredImages[newIndex]);
  };

  const imagesPerPage = 6;
  const goToNext = () => {
    const maxIndex = Math.ceil(filteredImages.length / imagesPerPage) - 1;
    setCurrentIndex(prevIndex => prevIndex >= maxIndex ? 0 : prevIndex + 1);
  };
  const goToPrev = () => {
    const maxIndex = Math.ceil(filteredImages.length / imagesPerPage) - 1;
    setCurrentIndex(prevIndex => prevIndex <= 0 ? maxIndex : prevIndex - 1);
  };

  // Touch event handlers for swipe gestures
  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isSignificantSwipe = Math.abs(distance) > 50;
    if (isSignificantSwipe) {
      if (distance > 0) goToNext();
      else goToPrev();
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Like, download, share
  const toggleLikeImage = (e, imageId) => {
    e.stopPropagation();
    setLikedImages(prev =>
      prev.includes(imageId)
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    );
  };
  const downloadImage = (e, image) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = image.src;
    link.download = `macha-${image.category}-${image.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const shareImage = (e, image) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: image.alt,
        text: `Check out this ${image.category} service from MACHA!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Animations
  const galleryGridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };
  const galleryItemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2
      }
    },
    hover: {
      y: -8,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };
  const modalVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };
  const modalContentVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.15 }
    }
  };
  const filterButtonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  return (
    <section id="gallery" className="section-padding bg-gradient-to-b from-[#f8fbff] to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-gradient-to-br from-green-50 to-black/10 opacity-70"></div>
      <div className="absolute -bottom-10 right-20 w-80 h-80 rounded-full bg-gradient-to-tr from-green-50 to-black/10 opacity-60"></div>
      <div className="absolute top-40 left-1/3 w-16 h-16 rounded-full bg-gradient-to-r from-green-100 to-black/10 opacity-30"></div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-gradient-to-r from-green-500/10 to-black/10 p-1 rounded-full mb-5">
            <span className="px-5 py-2 rounded-full bg-white text-green-700 text-sm font-medium inline-block">SHOWCASE</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">Our Service <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-black">Gallery</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-black mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Explore our service delivery highlights through this visual showcase of our work in Choutuppal and surrounding areas
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { delay: 0.2, duration: 0.5 }
            }
          }}
          className="mb-10 relative"
        >
          <div className="sm:hidden">
            <button
              onClick={() => setShowCategoryFilter(!showCategoryFilter)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white border border-green-100 rounded-lg text-slate-700 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Filter size={16} />
                <span>{categories.find(c => c.id === currentCategory)?.name || 'All'}</span>
              </div>
              <span className="text-sm text-slate-500">{showCategoryFilter ? 'Hide filters' : 'Show filters'}</span>
            </button>
            <AnimatePresence mode="sync">
              {showCategoryFilter && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-10 w-full mt-2 bg-white border border-green-100 rounded-lg shadow-md p-3"
                >
                  {categories.map(category => (
                    <motion.button
                      key={category.id}
                      variants={filterButtonVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                      onClick={() => {
                        setCurrentCategory(category.id);
                        setShowCategoryFilter(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md mb-1 last:mb-0 ${
                        currentCategory === category.id
                          ? 'bg-gradient-to-r from-green-600 to-black text-white'
                          : 'hover:bg-green-50 text-slate-700'
                      }`}
                    >
                      {category.name}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="hidden sm:flex justify-center flex-wrap gap-2">
            {categories.map(category => (
              <motion.button
                key={category.id}
                variants={filterButtonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onClick={() => setCurrentCategory(category.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  currentCategory === category.id
                    ? 'bg-gradient-to-r from-green-600 to-black text-white shadow-sm'
                    : 'bg-green-50 border border-green-100 text-green-700 hover:bg-green-100'
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Gallery grid */}
        <div className="relative">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="aspect-square rounded-xl bg-gradient-to-br from-green-50 to-black/5 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <>
              {filteredImages.length > 0 ? (
                <div
                  ref={carouselRef}
                  className="overflow-hidden"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentCategory + currentIndex}
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                      variants={galleryGridVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      {filteredImages.slice(currentIndex * imagesPerPage, currentIndex * imagesPerPage + imagesPerPage).map((image) => (
                        <motion.div
                          key={image.id}
                          variants={galleryItemVariants}
                          className={`aspect-square ${image.featured ? 'sm:col-span-2 sm:row-span-1 lg:col-span-1' : ''}`}
                          whileHover="hover"
                          onHoverStart={() => setHoveredImageId(image.id)}
                          onHoverEnd={() => setHoveredImageId(null)}
                        >
                          <div
                            className="h-full rounded-xl overflow-hidden shadow-sm border border-green-100 cursor-pointer relative group"
                            onClick={() => openModal(image)}
                          >
                            <img
                              src={image.src}
                              alt={image.alt}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                              onError={e => {
                                e.target.onerror = null;
                                e.target.src = "https://via.placeholder.com/800x800?text=Image+Unavailable";
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            {/* Hover overlay */}
                            <motion.div
                              className="absolute bottom-0 left-0 right-0 p-4"
                              initial={{ y: 20, opacity: 0 }}
                              animate={{
                                y: hoveredImageId === image.id ? 0 : 20,
                                opacity: hoveredImageId === image.id ? 1 : 0
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              <p className="text-white font-medium">{image.alt}</p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="inline-block text-xs px-3 py-1 bg-white/20 rounded-full text-white backdrop-blur-sm">
                                  {image.category.charAt(0).toUpperCase() + image.category.slice(1)}
                                </span>
                                <div className="flex gap-2">
                                  <motion.button
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={(e) => toggleLikeImage(e, image.id)}
                                    className={`p-1.5 rounded-full ${likedImages.includes(image.id) ? 'bg-red-500' : 'bg-white/20 hover:bg-white/30'} backdrop-blur-sm`}
                                  >
                                    <Heart size={16} className={likedImages.includes(image.id) ? 'text-white fill-white' : 'text-white'} />
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={(e) => downloadImage(e, image)}
                                    className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                                  >
                                    <Download size={16} className="text-white" />
                                  </motion.button>
                                </div>
                              </div>
                              {/* Quick view button */}
                              <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{
                                  opacity: hoveredImageId === image.id ? 1 : 0,
                                  y: hoveredImageId === image.id ? 0 : 10
                                }}
                                transition={{ delay: 0.1, duration: 0.2 }}
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30"
                              >
                                <ZoomIn size={30} className="text-white" />
                              </motion.button>
                            </motion.div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white p-12 rounded-xl border border-green-100 shadow-sm text-center"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-6">
                    <CameraOff size={32} className="text-slate-400" />
                  </div>
                  <h3 className="text-2xl font-medium text-slate-800 mb-3">No images in this category</h3>
                  <p className="text-slate-600 mb-6 max-w-md mx-auto">
                    We couldn't find any images in the selected category. Try selecting a different category to see more of our work.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentCategory('all')}
                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-black text-white rounded-lg hover:from-green-700 hover:to-black transition-all"
                  >
                    View all images
                  </motion.button>
                </motion.div>
              )}
              {/* Navigation buttons */}
              {filteredImages.length > imagesPerPage && (
                <>
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    onClick={goToPrev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-4 lg:-translate-x-6 w-12 h-12 rounded-full bg-white border border-green-100 text-slate-700 shadow-md flex items-center justify-center hover:bg-gradient-to-r hover:from-green-50 hover:to-black/10 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-green-600"
                    aria-label="Previous images"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronLeft size={24} />
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    onClick={goToNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-4 lg:translate-x-6 w-12 h-12 rounded-full bg-white border border-green-100 text-slate-700 shadow-md flex items-center justify-center hover:bg-gradient-to-r hover:from-green-50 hover:to-black/10 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-green-600"
                    aria-label="Next images"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronRight size={24} />
                  </motion.button>
                </>
              )}
            </>
          )}
        </div>
        {/* Pagination dots */}
        {!isLoading && filteredImages.length > imagesPerPage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex justify-center space-x-2 mt-10"
          >
            {Array.from({ length: Math.ceil(filteredImages.length / imagesPerPage) }).map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all ${
                  currentIndex === index
                    ? 'w-8 h-2.5 bg-gradient-to-r from-green-600 to-black rounded-full'
                    : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400 rounded-full'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </motion.div>
        )}
      </div>
      {/* Modal */}
      <AnimatePresence mode="sync">
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center backdrop-blur-sm"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="relative w-full max-w-6xl max-h-[80vh] px-4"
              variants={modalContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-full object-contain rounded-lg"
                loading="eager"
                onError={e => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/800x800?text=Image+Unavailable";
                }}
              />
              {/* Show image actions button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowImageActions(!showImageActions)}
                className="absolute top-4 left-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <Share2 size={20} />
              </motion.button>
              {/* Image action buttons */}
              <AnimatePresence>
                {showImageActions && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-16 left-4 bg-white/10 backdrop-blur-md p-3 rounded-lg flex flex-col gap-3"
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => downloadImage(e, selectedImage)}
                      className="bg-white/20 hover:bg-white/30 w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <Download size={20} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => shareImage(e, selectedImage)}
                      className="bg-white/20 hover:bg-white/30 w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <Share2 size={20} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => toggleLikeImage(e, selectedImage.id)}
                      className={`${likedImages.includes(selectedImage.id) ? 'bg-red-500' : 'bg-white/20 hover:bg-white/30'} w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors`}
                    >
                      <Heart size={20} className={likedImages.includes(selectedImage.id) ? 'fill-white' : ''} />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex flex-col items-center">
                  <h3 className="text-white text-lg font-medium">{selectedImage.alt}</h3>
                  <p className="text-green-400 text-sm">
                    {filteredImages.findIndex(img => img.id === selectedImage.id) + 1} of {filteredImages.length}
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigateImage('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors backdrop-blur-sm"
                aria-label="Previous image"
              >
                <ChevronLeft size={28} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigateImage('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors backdrop-blur-sm"
                aria-label="Next image"
              >
                <ChevronRight size={28} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeModal}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors backdrop-blur-sm"
                aria-label="Close modal"
              >
                <X size={24} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;