# My Personal Portfolio Website

## Planned Layout 
### Overview
- Header Bar
- Hero Section 
- Bio Section
- Experience Section
- Featured Projects Section
- Contact Section

### Header Bar
- Styling: 
    - Static (doesn't scroll out of veiwport)
    - Opacity 100% with bg blur
- Content: 
    - Far left corner: Scotland time ticking
    - Far right corner: "LETS TALK"
- Animations: 
    - contact text 
        - entry: letters typed 
        - hover: scramble on hover
    - time text 
        - entry: letters typed
        - change: flash
- Inspiration: 
    - https://evasanchez.info/

### Hero Section
- Styling: 
    - Swiss style full screen, 12 columns
    - Text starts in the 6th colum
    - Text is vertically centred
    - cocosBlacks bg
    - roughAsphalt text
    - name is Epilogue Font
    - all other text is mono font
    - socials links are text not icons, but have the up-right arrow at the end
- Content: 
    - "Finlay O'Neill" - split over 2 lines
    - "Data Engineer, Developer, Solopreneur, etc"
    - Socials links - linkedin, github, read.cv
    - Scroll down icon - bottom centre ?
    - Picture of me - bottom left ?
- Animations: 
    - name text: 
        - entry: letters appear after different delays
        - hover: letter fill dissapears - outline remains
    - job text: 
        - entry: typed out
        - loops: deletes and types out the next job title
    - socials text: 
        - entry: typed out
        - hover: scrambles
- Inspiration: 
    - https://evasanchez.info/

### Bio Section
- Styling: 
    - Swiss style full screen, 12 columns
    - Content layout should be the section header to the left side of the screen and the bio content to the right side of the screen - header should not be stacked above the bio content
    - Section header text starts in 1st column
    - Bio content starts in the 4th column
    - Section header text is firaCode font is a relatively small text size
    - Bio content text is Epilogue font and is a relatively extra large text size
    - cocosBlacks bg
    - roughAsphalt text
- Content: 
    - section header: 
        - "about_me"
    - bio content: 
        - "Multiple experience as a developer and data engineer. Many industries, team sizes, and job titles. Experience building simple automations, industry specific applications, machine learning processes."
- Animations:
    - section header: 
        - entry: typed out
    - bio text: 
        - on scroll: gradient scroll opacity. text by default has a slight opacity (eg. text-roughAsphalt/50) then as the user scrolls, each character one-by-one appears without the opacity. the further the user scrolls down, the more characters have no opacity. when the user scrolls back up, more characters get opacity. 
- Inspiration: 
    - https://blog.olivierlarose.com/tutorials/text-gradient-scroll-opacity-v2
    

### Experience Section
- Styling: 
    - Swiss style full screen, 12 columns
    - Content layout should be the section header to the left side of the screen and the bio content to the right side of the screen - header should not be stacked above the bio content - use px-4
    - Section header text starts in 1st column
    - Experience content starts in the 4th column
    - Section header text is firaCode font is a relatively small text size
    - Experience content will be an animated timeline that shows each timeline element vertically sequentially
    - Experience content will appear next to a timeline bar that progressively "fills" as the user scrolls
    - Experience headers text is Epilogue font and is a relatively extra large text size
    - Experience dates are firaCode, smaller that experience headers
    - cocosBlacks bg
    - roughAsphalt text
- Content: 
    - section header: 
        - "experience"
    - experience timeline content: 
        - Use experience constants object to populate timeline elements
        - Each element should contain the information contained in the constants file. 
        - should end with "see full experience" and link to my CV 
- Animations:
    - section header: 
        - entry: typed out
    - experience timeline bar:
        - on scroll: timeline bar follows the scroll of the user, bar thickness increases as to signal the user is moving through the timeline 
    - experience elements: 
        - on scroll down: as user scrolls to a certain percentage of the viewport for each element, they fade in from the bottom
        - on scroll up: similarly, element fade out as user scrolls up
- Inspiration: 
    - https://timeline-component.framer.website/one-side-dots

### Featured Projects Section
- Styling: 
    - Swiss style full screen, 12 columns
    - Content layout should be the section header to the left side of the screen and the project content to the right side of the screen - header should not be stacked above the bio content
    - Section header text starts in 1st column
    - Project content starts in the 4th column
    - Section header text is firaCode font is a relatively small text size
    - Project content is a vertically stacked list of project titles, with a thin bar/separator between them - each project title should have a separator at the top and bottom
    - Project titles text is Epilogue font and is a relatively extra large text size - these will be external links
    - roughAsphalt text
- Content: 
    - section header: 
        - "featured_projects"
    - projects content: 
        - "Resume Tailor SaaS Application"
        - "John McLellan's Website"
        - "Quant Equity Pre-Trade Risk Dashboard"
        - "Portfolio Analytics Toolset" 
        - "LSTM Share Price Prediction" 
        - "Autoencoder Equity Factor Decomposition" 
        - "Telecom Data Pipeline"
        - "FinTech Sales Customer Targetting"
        - "ESG Data Pipeline"
        - "Portfolio Optimisation" 
- Animations:
    - section header: 
        - entry: typed out
    - project titles text: 
        - entry: each project title slides up from the bottom of its container - all project titles synchronised to slide up at the same time
        - hover: shifts to the right on hover slightly - all over project titles text becomes more opaque - css :not(:hover) effect
- Inspiration: 
    - https://samgoddard.co.uk/
    - https://nerdy.dev/hover-not-hover-sorry-not-sorry

### Contact Section
- Styling: 
    - Swiss style full screen, 12 columns
    - cocosBlacks bg
    - roughAsphalt text
    - contact text is Epilogue font
    - all other text is firaCode font
    - socials links are text not icons, but have the up-right arrow at the end
- Content: 
    - "Let's work together" in very large text nearer the top but leaving enough space for the nav/header
    - socials links below and start in column 7 of 12
    - copy sign + + dynamic year + "all_rights_reserved" also in column 7
- Animations: 
    - contact text: 
        - loop: continuously slides from right to left before 
    - socials text: 
        - entry: typed out
        - hover: scrambles
    - all rights text: 
        - entry: typed out
        - hover: scrambles
- Inspiration: 
    - https://evasanchez.info/
    - https://sagar-sharma.framer.website/
        


