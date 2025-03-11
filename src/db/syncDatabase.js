// src/syncDatabase.js
import sequelize from './dbConnect.js';
import ImagesData from '../models/homePage/ImagesData.js';
// Home Page
import HomeHeroSection from '../models/homePage/HeroSection.js';
import Section11 from '../models/homePage/Section11.js';
import Section2 from '../models/homePage/Section2.js';
import Section3 from '../models/homePage/Section3.js';
import Section4 from '../models/homePage/Section4.js';
import Section5 from '../models/homePage/Section5.js';
import Section6 from '../models/homePage/Section6.js';
import Section7 from '../models/homePage/Section7.js';
import Section8 from '../models/homePage/Section8.js';
import Section9 from '../models/homePage/Section9.js';
import Testimonial from '../models/homePage/Testimonial.js';
import HomeFAQ from '../models/homePage/HomeFAQ.js';
// Product Page
import heroSectionProductPage from '../models/productPage/HeroSectionProductPage.js';
import Section2Optional from '../models/productPage/Section2Optional.js';
import section2Product from '../models/productPage/Section2Product.js';
import section3Product from '../models/productPage/Section3Products.js';
import section4Product from '../models/productPage/Section4Product.js';
import section5Product from '../models/productPage/Section5Product.js';
import section6Product from '../models/productPage/Section6Product.js';
import section7Product from '../models/productPage/Section7Product.js';
import SEOProductPage from '../models/productPage/SEO.js';
import ProductPageStatus from '../models/productPage/Status.js';

// contact page
import heroSectionContactPage from '../models/contactPage/HeroSection.js';
import GetInTouch from '../models/getInTouch.js';
import ContactForm from '../models/contactPage/ContactForm.js';
// about page
import HeroSectionAboutPage from '../models/aboutPage/HeroSection.js';
import AboutSection2 from '../models/aboutPage/Section2.js';
import AboutSection3 from '../models/aboutPage/Section3.js';
import AboutSection4 from '../models/aboutPage/Section4.js';
import AboutSection5 from '../models/aboutPage/Section5.js';
// CommonSEO
import CommonSEO from '../models/commonseo/SEO.js';
// blog
import ContentBlog from '../models/blogPage/content.js';
import BlogImageData from '../models/blogPage/BlogImage.js';
import CreateBlogId from '../models/blogPage/IdGenerate.js';
import Category from '../models/blogPage/Category.js';
import CommonBlogContent from '../models/blogPage/CommonBlogContent.js';
import SEOBlogPage from '../models/blogPage/SEO.js';
import BlogStatus from '../models/blogPage/BlogStatus.js';
import BlogPageHeading from '../models/blogPage/Main.js';
// partner page
import HeroSectionPatnerPage from '../models/partnerPage/HeroSection.js';
import PartnerContactForm from '../models/partnerPage/PartnerContactForm.js';
//privacy page
import HeroSectionPrivacyPage from '../models/privacyPage/HeroSection.js';
//refundPolicy page
import heroSectionRefundPolicyPage from '../models/refundPolicyPage/HeroSection.js';
//termconditon page
import heroSectionTermConditionPage from '../models/termConditionPage/HeroSection.js';
// common_term_condition_page
import CommonTermConditionPage from '../models/commontermpolicypage/index.js';
// admin creditial
import AdminModel from '../models/AdminModel.js';

// admin setting
import AdminSetting from '../models/adminSetting/index.js';

// Script model
import HeadScript from '../models/Script/HeadScript.js';
import BodyScript from '../models/Script/BodyScript.js';
import FooterScript from '../models/Script/FooterScript.js';
// lead reciveing email
import LeadFormEmail from '../models/formEmail/Email.js';

// hide unhide all status
import HideUnhideStatus from '../models/hideUnhide/index.js';

//AdminFooterSetting
import AdminFooterSetting from '../models/adminSetting/footer.js';
import FooterCTA from '../models/adminSetting/footerCta.js';

// dynamic page create 
import heroSectionCreatePage from '../models/create-page/herosection.js';
import CreatePageId from '../models/create-page/createid.js';




 async function syncDatabase() {
  try {
    // Ensure models are defined before syncing
    // await sequelize.sync({ force: true }); // Drop and recreate tables (for development only)
    await sequelize.sync({ alter: true });  

    console.log('Database & tables created!');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
}

// Call this function to sync the database
 export default syncDatabase;
