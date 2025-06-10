import { useState } from 'react';
import { Send, Crown, FileText, Scroll, Star, AlertCircle, CheckCircle, ArrowLeft, Shield, Zap } from 'lucide-react';
import Link from 'next/link';
export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  
    feedbackType: '',
    rating: 0,
   
    message: '',
    
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);

  const feedbackTypes = [
    { value: 'bug', label: 'Report a Bug', icon: '🐛', },
    { value: 'feature', label: 'Feature Request', icon: '⚔️'},
    { value: 'praise', label: 'Praise', icon: '👑'},

    { value: 'general', label: 'General comment', icon: '📜' }
  ];



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
     
      feedbackType: '',
      rating: 0,
 
      message: '',
     
    });
    setSubmitted(false);
    setHoveredStar(0);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black text-white flex items-center justify-center p-6">
        <div className="max-w-xl w-full">
          <div className="bg-gradient-to-br from-green-900/30 to-black/50 backdrop-blur-sm rounded-2xl p-8 border-2 border-green-500/30 text-center shadow-2xl shadow-green-500/20">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-yellow-400 mb-4">
              FeedBack Sent
            </h2>
         
            <button
              onClick={resetForm}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-black px-8 py-3 rounded-full font-bold hover:from-green-400 hover:to-blue-400 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Send Another FeedBack
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black text-white relative overflow-hidden">
      <header className="relative p-6 border-b border-red-900/30">
        <Link href="/login">
        <ArrowLeft className="w-9 h-9 mr-2 group-hover:-translate-x-1 transition-transform" />
         
        </Link>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Scroll className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-400 to-red-400 mb-4">
              Feedback
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 border-2 border-red-900/30 shadow-2xl shadow-red-900/30">
            {/* Identity */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center gap-3">
        
                Your Identity
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-300 mb-2 font-semibold">
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
              
                    className="w-full px-4 py-3 bg-gray-900/50 border-2 border-red-800/50 rounded-lg text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-2 font-semibold">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  
                    className="w-full px-4 py-3 bg-gray-900/50 border-2 border-red-800/50 rounded-lg text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none transition-colors"
                  />
                </div>
              </div>
           
            </div>

            {/* Feedback Type */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center gap-3">
                <FileText className="w-6 h-6" />
                Nature of Your Message <span className="text-red-400">*</span>
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {feedbackTypes.map((type) => (
                  <label
                    key={type.value}
                    className={`cursor-pointer p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                      formData.feedbackType === type.value
                        ? 'border-yellow-400 bg-yellow-400/10'
                        : 'border-red-800/50 bg-gray-900/30 hover:border-red-500/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="feedbackType"
                      value={type.value}
                      checked={formData.feedbackType === type.value}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="text-2xl mb-2">{type.icon}</div>
                      <div className="font-bold text-white mb-1">{type.label}</div>
                      <div className="text-sm text-gray-400">{type.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-3">
                <Shield className="w-6 h-6" />
                Rate Your Experience
              </h3>
              <p className="text-gray-300 mb-4">How would you rate The Raven's Roost?</p>
              <div className='flex'>
                <div className="flex gap-2 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                      className={`transition-all duration-200 hover:scale-110 ${
                        star <= (hoveredStar || formData.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-600'
                      }`}
                    >
                      <Star className="w-8 h-8 fill-current" />
                    </button>
                  ))}
                </div>
                <div>
                  <p className="text-lg text-yellow-400 font-bold ml-10 mt-1">
                    {formData.rating === 0 && "Click to rate"}
                    {formData.rating === 1 && "Poor"}
                    {formData.rating === 2 && "Below expectations"}
                    {formData.rating === 3 && "Acceptable"}
                    {formData.rating === 4 && "Good "}
                    {formData.rating === 5 && "Excellent"}
                  </p>
                </div>
              </div>
            </div>

            {/* Subject and Message */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center gap-3">
                <Scroll className="w-6 h-6" />
                Your Message
              </h3>
             
              <div className="mb-4">
                <label className="block text-gray-300 mb-2 font-semibold">
                  Your Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                
                  className="w-full px-4 py-3 bg-gray-900/50 border-2 border-red-800/50 rounded-lg text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none transition-colors resize-vertical"
                />
              </div>
           
            </div>

            {/* Submit */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-gradient-to-r from-red-500 to-yellow-500 text-black px-8 py-4 rounded-full font-bold text-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-red-500/50 border-2 border-yellow-400 flex items-center gap-3 mx-auto ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:from-red-400 hover:to-yellow-400'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    Dispatching Raven...
                  </>
                ) : (
                  <>Submit</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
