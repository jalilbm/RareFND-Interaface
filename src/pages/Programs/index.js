import CategoryCarousel from "../../components/CategoryCarousel";
import Charity from "../../assets/carousel/charity.jpg";
import Startup from "../../assets/carousel/startup.jpg";
import AboutUs from "../../assets/carousel/AboutUs.jpg";
import { Tabs } from "@mui/material";
import { Tab } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./index.css";
import { useState } from "react";

export default function About() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event, newTabInex) => {
    setTabIndex(newTabInex);
  };

  return (
    <div>
      <CategoryCarousel image={AboutUs} title="Programs" />
      <div
        className="mt-5"
        style={{ border: " 2px solid #FAD02C", width: "10%",minWidth:"60px", marginLeft: "5%" }}
      ></div>
      <h1
        className="mt-4"
        style={{
          color: "white",
          fontWeight: "bold",
          marginLeft: "5%",
          fontFamily:
            "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif",
        }}
      >
        Our Programs
      </h1>
      <Box>
        <Box  className="w-100">
          <Tabs
            value={tabIndex}
            onChange={handleChange}
            className="m-2"
            TabIndicatorProps={{ style: { background: "#FAD02C" } }}
            aria-label="secondary tabs example"
            centered
          >
            <Tab  id="CharityFundraising"
            
              style={{
                maxWidth:"200px",
                width:"50%",
                color: "white",
                fontFamily:
                  "'Calibri', sans-serif",
                  fontWeight: "bold",
                  fontSize:"15px"
                
              }}
              label="Charity Fundraising" 
            />
            <Tab
             id="StartupFundraising"
              style={{
                maxWidth:"200px",
                width:"50%",
                color: "white",
                fontFamily:
                  "'Calibri', sans-serif",
                fontWeight: "bold",
                fontSize:"15px"
              }}
              label="Startups Fundraising"
             />
          </Tabs>
        </Box>
        <Box sx={{ padding: "3vw" }}>
          {
            <Box className="h-100">
              <Typography>
                <div
                  style={{ color: "white", height: "100%" }}
                  className="programText bg-white text-black mx-auto"
                >
                  <div>
                    <img  style={{height:"60vh",width:"100%",objectFit: "cover"}}
                      src={
                        tabIndex === 0
                          ? Charity
                          : Startup
                      }
                      className="img-fluid shadow-4"
                      alt="..."
                    />
                  </div>
                   
                  <div style={{ padding: "5vw" ,fontFamily:"Calibri"}}>
                  
                    {tabIndex === 0 ? (<><p>
                     RareFnd campaigns make ideas into reality. It’s where
                      creators share new visions for creative work with the
                      communities that will come together to fund them.
                    </p>
                    <p>
                      Some of these creators, like Critical Role, TLC, and The
                      Smithsonian Institution already had huge fanbases. But
                      many projects have been as small-scale as a limited run of
                      silent meditation vinyls or as up-and-coming as early
                      versions of Issa Rae's Insecure and Phoebe Waller-Bridge’s
                      Fleabag.
                    </p>
                    <p>
                      No matter what, creators always control how the work comes
                      together—no 100-page grant applications, no donors
                      demanding you modify your message, no last-minute edits
                      from investors. When backers chip in funding and help
                      spread the word, they too become part of these independent
                      works.
                    </p> </>):<><p>ikram</p><p>jalil</p><p>ania</p></>}
                    
                    <div className="col-md-12 text-center">
                      <Link to="/start-project">
                        <button type="button" className="btn">
                          Start Project  {'>>'}
                        </button>
                      </Link>
                    </div>
                  </div>
                  
                </div>
              </Typography>
            </Box>
          }
        </Box>
      </Box>
    </div>
  );
}
