

const DOMAINS = [
  {
    id: 1,
    title: "Executive Leadership Readiness",
    sections: [
      {
        id: "1.1",
        title: "Strategy",
        subdomains: [
          {
            id: "1.1.1",
            title: "Alignment with Educational Objectives: Ensuring Gen AI initiatives align with the district's mission, vision, goals, and values.",
            descriptions: {
              Emerging: "Description: There is awareness of Gen AI potential but no clear alignment with educational objectives. Evidence: Gen AI initiatives are considered without a direct link to the district's mission or goals. Recommendations: Begin aligning Gen AI efforts with the district's broader educational objectives.",
              Developing: "Description: There is a moderate alignment of Gen AI initiatives with educational goals. Evidence: Some Gen AI projects reflect the district's mission but lack full integration. Recommendations: Strengthen the connection between Gen AI initiatives and the district's educational objectives.",
              Mature: "Description: Gen AI initiatives are fully aligned with and integral to educational objectives. Evidence: Gen AI is a key component in fulfilling the districts mission and educational goals. Recommendations: Continue to innovate and ensure that Gen AI initiatives evolve with educational objectives.",
            },
          },
          {
            id: "1.1.2",
            title: "Infrastructure and Resource Management: Assessing and preparing the necessary infrastructure and resources for Gen AI implementation.",
            descriptions: {
              Emerging: "Description: Minimal infrastructure exists for Gen AI; resources are not specifically allocated. Evidence: There is a lack of dedicated tools and resources for Gen AI implementation. Recommendations: Assess current infrastructure capabilities and identify necessary resources for Gen AI projects.",
              Developing: "Description: Infrastructure is developing for Gen AI with increasing resource allocation. Evidence: Emerging infrastructure supports Gen AI but requires expansion. Recommendations: Enhance infrastructure and allocate more resources specifically for Gen AI initiatives.",
              Mature: "Description: An advanced and dedicated infrastructure exists for Gen AI with strategic resource allocation. Evidence: Infrastructure and resources are optimally aligned with the districts Gen AI needs. Recommendations: Maintain and upgrade infrastructure as needed to keep pace with evolving Gen AI technologies.",
            },
          },
          {
            id: "1.1.3",
            title: "Cross-functional Team Dynamics: Forming and managing cross-functional teams to provide comprehensive oversight of Gen AI initiatives.",
            descriptions: {
              Emerging: "Description: No established cross-functional teams exist for overseeing Gen AI initiatives. Evidence: Gen AI initiatives lack comprehensive oversight due to missing cross-functional collaboration. Recommendations: Form initial cross-functional teams involving diverse stakeholders for Gen AI oversight.",
              Developing: "Description: Cross-functional teams exist but may not fully cover all Gen AI aspects. Evidence: There is some oversight by cross-functional teams but with limited scope. Recommendations: Expand cross-functional teams to include wider expertise and responsibilities.",
              Mature: "Description: Fully functional, comprehensive cross-functional teams are in place for Gen AI initiatives. Evidence: There is effective collaboration and oversight by cross-functional teams on Gen AI projects. Recommendations: Continue fostering cross-functional collaboration and adapt teams as Gen AI evolves.",
            },
          },
          {
            id: "1.1.4",
            title: "Strategic Planning and Governance: Developing and executing strategic plans for the adoption and governance of Gen AI.",
            descriptions: {
              Emerging: "Description: There is an absence of specific strategic plans for Gen AI adoption. Evidence: Gen AI initiatives are not integrated into broader strategic planning. Recommendations: Develop initial strategic plans that include Gen AI considerations.",
              Developing: "Description: Strategic plans that include Gen AI exist, but are not comprehensive. Evidence: Gen AI is part of strategic planning, but integration could be deeper. Recommendations: Refine strategic plans to fully integrate Gen AI considerations in governance and operations.",
              Mature: "Description: Comprehensive and dynamic strategic planning fully integrates Gen AI. Evidence: Gen AI is a central element of strategic planning and governance. Recommendations: Regularly update strategic plans to reflect new developments in Gen AI.",
            },
          },
          {
            id: "1.1.5",
            title: "Monitoring Performance Metrics and Financial Considerations: Establishing metrics to evaluate the impact and challenges of Gen AI and consider its financial implications.",
            descriptions: {
              Emerging: "Description: No specific metrics or financial plans exist for evaluating Gen AI impact. Evidence: Gen AI impact and financial implications are not systematically assessed. Recommendations: Begin establishing basic metrics for evaluating Gen AI and consider its financial implications.",
              Developing: "Description: Initial metrics are being introduced, and some financial planning is occurring, but efforts are limited in scope. Evidence: Some departments are starting to track Gen AI performance, but financial analysis is informal or inconsistent. Recommendations: Build out consistent performance monitoring tools but align financial planning with Gen AI Initiatives.",
              Mature: "Description: There are sophisticated metrics and financial models for Gen AI impact evaluation. Evidence: Gen AI impact and financial aspects are thoroughly evaluated and inform decision-making. Recommendations: Continuously refine metrics and financial models to accurately assess Gen AI's evolving impact.",
            },
          },
        ],
      },
      {
        id: "1.2",
        title: "Legislation and Administrative Rules",
        subdomains: [
          {
            id: "1.2.1",
            title: "Legal Compliance and Restrictions: Ensuring adherence to federal and state laws and district rules regarding the use of Gen AI.",
            descriptions: {
              Emerging: "Description: There is a basic awareness of legal requirements for Gen AI without comprehensive compliance. Evidence: There is inadequate adherence to state laws and district rules for Gen AI usage. Recommendations: Develop an understanding of relevant laws and begin aligning Gen AI usage with these requirements.",
              Developing: "Description: Adherence to legal frameworks exists with an increased understanding of Gen AI implications. Evidence: Better alignment with legal requirements exists but there are still gaps in comprehensive compliance. Recommendations: Enhance efforts to comply fully with legal standards and district rules regarding Gen AI.",
              Mature: "Description: There is full compliance with legal and regulatory frameworks for Gen AI. Evidence: Gen AI usage fully adheres to state laws and district rules. Recommendations: Maintain and continuously update compliance measures as legal standards evolve.",
            },
          },
          {
            id: "1.2.2",
            title: "Educational Policy Integration: Integrating Gen AI within the existing educational policies and frameworks.",
            descriptions: {
              Emerging: "Description: Initial efforts have been made to integrate Gen AI into existing policies without full alignment. Evidence: Gen AI usage is not yet fully integrated into educational policies. Recommendations: Start aligning Gen AI with current educational policies and frameworks.",
              Developing: "Description: There is progress in integrating Gen AI into educational policies, but it is not yet fully systemic. Evidence: Gen AI is partially integrated into educational policies, but integration is not yet complete. Recommendations: Continue to refine and fully integrate Gen AI into all relevant educational policies.",
              Mature: "Description: Gen AI is completely and systemically integrated into educational policies. Evidence: Gen AI is fully embedded within the educational policy framework. Recommendations: Ensure ongoing alignment and adaptation of policies as Gen AI evolves.",
            },
          },
          {
            id: "1.2.3",
            title: "Board Education and Policy Updates: Keeping the School Board educated, informed, and updated on Gen AI usage and policies.",
            descriptions: {
              Emerging: "Description: There are limited or ad-hoc efforts to educate the School Board about Gen AI. Evidence: The School Board is not fully informed or involved in Gen AI-related decisions. Recommendations: Initiate regular updates and education sessions for the School Board on Gen AI.",
              Developing: "Description: There are regular but not fully comprehensive education updates for the School Board. Evidence: The School Board is more informed about Gen AI but not engaged in all aspects. Recommendations: Increase the depth and frequency of Gen AI-related communications and involvement with the School Board.",
              Mature: "Description: There are comprehensive and proactive education and policy updates for the School Board. Evidence: The School Board is fully involved and kept up-todate on all aspects of Gen AI. Recommendations: Sustain and evolve the board's education and involvement with ongoing Gen AI advancements.",
            },
          },
        ],
      },
      {
        id: "1.3",
        title: "Use Policy",
        subdomains: [
          {
            id: "1.3.1",
            title: "Policy Development and Publication: Creating and disseminating formal policies for the responsible use of Gen AI.",
            descriptions: {
              Emerging: "Description: Policies for Gen AI usage are in the initial stages of development. Evidence: There is a lack of formalized policies for responsible Gen AI usage. Recommendations: Start creating and disseminating basic policies for Gen AI usage.",
              Developing: "Description: More comprehensive Gen AI use policies are developing. Evidence: Policies are in place but may not cover all aspects of Gen AI usage. Recommendations: Expand and refine the scope of Gen AI use policies.",
              Mature: "Description: Comprehensive and well-established policies for Gen AI usage are in place. Evidence: Policies cover all aspects of responsible Gen AI use and are widely understood. Recommendations: Continually review and update policies to reflect evolving Gen AI technologies and uses.",
            },
          },
          {
            id: "1.3.2",
            title: "Compliance Tracking and Enforcement: Monitoring and enforcing adherence to Gen AI use policies.",
            descriptions: {
              Emerging: "Description: There is ad-hoc monitoring and limited enforcement of Gen AI policies. Evidence: Adherence to Gen AI use policies is inconsistent. Recommendations: Develop methods for tracking compliance and begin enforcing existing policies.",
              Developing: "Description: There is improved tracking of compliance and enforcement measures. Evidence: Compliance with Gen AI policies is better, though inconsistencies remain. Recommendations: Strengthen compliance tracking systems and enforcement mechanisms.",
              Mature: "Description: Robust systems exist for tracking compliance and enforcing policies. Evidence: There is a high level of adherence to Gen AI use policies across the district. Recommendations: Maintain and periodically enhance compliance monitoring and enforcement practices.",
            },
          },
          {
            id: "1.3.3",
            title: "Vendor Contractual Obligations: Incorporating Gen AI use considerations into vendor contracts.",
            descriptions: {
              Emerging: "Description: There is minimal consideration of Gen AI in vendor contracts. Evidence: Vendor contracts do not adequately cover Gen AI usage terms. Recommendations: Start incorporating Gen AI considerations into new and existing vendor contracts.",
              Developing: "Description: The inclusion of Gen AI considerations in contracts is increasing. Evidence: Some vendor contracts include Gen AI terms, but not uniformly. Recommendations: Ensure all vendor contracts systematically include Gen AI usage clauses.",
              Mature: "Description: Gen AI considerations are thoroughly integrated into all vendor contracts. Evidence: Vendor contracts consistently include detailed Gen AI usage terms. Recommendations: Regularly review and update contractual terms to stay current with Gen AI advancements.",
            },
          },
          {
            id: "1.3.4",
            title: "Data Training and Professional Development: Implementing training programs for the responsible use of Gen AI.",
            descriptions: {
              Emerging: "Description: There are limited or no training programs on responsible Gen AI usage. Evidence: Staff lack guidance on the responsible use of Gen AI. Recommendations: Initiate basic training programs on responsible Gen AI usage.",
              Developing: "Description: Training programs for responsible Gen AI usage are developing. Evidence: More staff are receiving training, but the content may not be comprehensive. Recommendations: Enhance the depth and breadth of Gen AI training programs.",
              Mature: "Description: Comprehensive training programs are in place for responsible Gen AI usage. Evidence: Staff are well-trained and knowledgeable about Gen AI usage. Recommendations: Continue to adapt and evolve training programs to keep pace with Gen AI developments.",
            },
          },
          {
            id: "1.3.5",
            title: "Content Creation and Attribution: Ensuring proper attribution in content created with Gen AI tools.",
            descriptions: {
              Emerging: "Description: There is little emphasis on attribution for Gen AI-created content. Evidence: Issues of content ownership and attribution are not addressed. Recommendations: Begin establishing guidelines for content creation and attribution using Gen AI.",
              Developing: "Description: There is a growing awareness of the need for proper attribution in Gen AI content. Evidence: Some measures are in place for content attribution, but not consistently applied. Recommendations: Implement more thorough guidelines and practices for content creation and attribution.",
              Mature: "Description: There is a strong emphasis and clear practices for attribution in Gen AI-created content. Evidence: Content creation and attribution issues are effectively managed. Recommendations: Keep refining attribution guidelines and practices as Gen AI capabilities evolve.",
            },
          },
        ],
      },
      {
        id: "1.4",
        title: "Equity",
        subdomains: [
          {
            id: "1.4.1",
            title: "Bias Prevention and Data Ethics: Addressing potential biases in Gen AI and promoting ethical data use.",
            descriptions: {
              Emerging: "Description: There is initial awareness of bias issues in Gen AI with minimal action taken. Evidence: Potential biases in Gen AI are not systematically addressed. Recommendations: Start recognizing and addressing biases in Gen AI and promote ethical data use.",
              Developing: "Description: There is a growing recognition of bias issues and ethical data use in Gen AI. Evidence: Efforts to address biases in Gen AI are underway but not comprehensive. Recommendations: Enhance initiatives to mitigate bias and promote ethical data usage in Gen AI.",
              Mature: "Description: Comprehensive strategies are in place to prevent bias and ensure ethical data use in Gen AI. Evidence: Systematic and effective measures are in place to mitigate bias in Gen AI. Recommendations: Continuously update and refine strategies for bias prevention and ethical data use.",
            },
          },
          {
            id: "1.4.2",
            title: "Vendor Selection and Algorithmic Fairness: Selecting vendors with a commitment to algorithmic fairness.",
            descriptions: {
              Emerging: "Description: There is limited consideration of algorithmic fairness in vendor selection. Evidence: Vendor selection does not fully account for algorithmic fairness. Recommendations: Begin incorporating algorithmic fairness criteria in vendor selection processes.",
              Developing: "Description: There is an increased emphasis on algorithmic fairness in vendor selection. Evidence: Algorithmic fairness is considered in vendor selection but not consistently applied. Recommendations: Strengthen criteria and processes for ensuring algorithmic fairness in vendor selection.",
              Mature: "Description: There is a systematic and thorough consideration of algorithmic fairness in all vendor selections. Evidence: Vendor selection rigorously accounts for algorithmic fairness in Gen AI tools. Recommendations: Maintain high standards for algorithmic fairness in vendor selection and regularly reassess criteria.",
            },
          },
          {
            id: "1.4.3",
            title: "Model Oversight and Human Intervention: Implementing oversight mechanisms for Gen AI models and human intervention protocols.",
            descriptions: {
              Emerging: "Description: There are minimal oversight mechanisms for Gen AI models. Evidence: There is a lack of structured protocols for overseeing Gen AI model decisions and human intervention. Recommendations: Develop initial oversight mechanisms and protocols for human intervention in Gen AI.",
              Developing: "Description: Oversight mechanisms for Gen AI models with some human intervention are developing. Evidence: Oversight mechanisms are in place but may not cover all aspects of Gen AI usage. Recommendations: Expand and strengthen oversight mechanisms and human intervention protocols.",
              Mature: "Description: Robust oversight mechanisms for Gen AI models are in place with effective human intervention. Evidence: Comprehensive and effective oversight and human intervention protocols are in place for Gen AI. Recommendations: Continually enhance and adapt oversight mechanisms to evolving Gen AI technologies.",
            },
          },
          {
            id: "1.4.4",
            title: "Equitable Access and Inclusivity Practices: Ensuring equitable access to Gen AI tools and fostering inclusivity.",
            descriptions: {
              Emerging: "Description: There is basic awareness of the need for equitable Gen AI access but limited practices. Evidence: Equitable access to Gen AI tools is not adequately addressed. Recommendations: Start implementing practices to ensure equitable access and inclusivity in Gen AI usage.",
              Developing: "Description: Practices to ensure equitable access to Gen AI tools are developing. Evidence: Efforts towards equitable access are present but not fully effective. Recommendations: Improve and broaden initiatives for equitable access and inclusivity in Gen AI.",
              Mature: "Description: Systemic and effective practices ensure equitable access to Gen AI tools. Evidence: Equitable access and inclusivity are fully integrated into Gen AI tool usage. Recommendations: Sustain and evolve practices to maintain and enhance equitable access and inclusivity in Gen AI.",
            },
          },
          {
            id: "1.4.5",
            title: "Data Management and Privacy: Prioritizing data management and privacy in AI tool procurement.",
            descriptions: {
              Emerging: "Description: There are basic data management and privacy considerations in AI procurement. Evidence: Data management and privacy are not centrally prioritized in Gen AI procurement. Recommendations: Begin prioritizing data management and privacy in AI tool procurement.",
              Developing: "Description: The focus on data management and privacy in AI procurement is improving. Evidence: Data management and privacy are considered in procurement but need further emphasis. Recommendations: Further prioritize data management and privacy considerations in all aspects of AI procurement.",
              Mature: "Description: There is advanced prioritization of data management and privacy in all AI procurements. Evidence: Data management and privacy are central to AI tool procurement processes. Recommendations: Continue to lead in data management and privacy practices, adapting to new challenges and technologies.",
            },
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Operational Readiness",
    sections: [
      {
        id: "2.1",
        title: "Procurement",
        subdomains: [
          {
            id: "2.1.1",
            title: "AI Procurement Standards and Ethics: Establishing ethical standards and guidelines for procuring Gen AI tools, aligned with the AI Bill of Rights and privacy laws.",
            descriptions: {
              Emerging: "Description: There is initial awareness of the importance of ethical standards in AI procurement, but a lack of formalized guidelines. Evidence: The organization recognizes the need for ethical procurement but has not yet established clear guidelines. Recommendations: Develop basic ethical standards and guidelines for AI procurement, taking into account the AI Bill of Rights and privacy laws.",
              Developing: "Description: More comprehensive ethical standards and guidelines for AI procurement are developing. Evidence: Ethical considerations are increasingly integrated into procurement decisions, but the process is not yet fully standardized or comprehensive. Recommendations: Continue to refine and expand the ethical standards and guidelines, ensuring they are well-aligned with the AI Bill of Rights and privacy laws.",
              Mature: "Description: Comprehensive and well-established ethical standards and guidelines for AI procurement are in place. Evidence: The organization has a robust framework for ethical AI procurement that is fully aligned with legal standards and privacy laws. Recommendations: Regularly review and update the ethical procurement guidelines to adapt to evolving AI technologies and ethical considerations.",
            },
          },
          {
            id: "2.1.2",
            title: "Procurement Process Compliance: Ensuring that procurement processes for Gen AI tools adhere to established standards and undergo proper review and approval.",
            descriptions: {
              Emerging: "Description: The district is in the initial stages of acknowledging the need for compliance in procurement processes. Evidence: Lack of structured review and approval systems. Procurement processes for Gen AI tools are irregular and not consistently aligned with standards. Recommendations: Establish basic compliance procedures and review mechanisms for procurement processes.",
              Developing: "Description: Implementation of compliance standards in procurement processes is improving, but not yet fully comprehensive. Evidence: Procurement processes are increasingly adhering to standards, but some inconsistencies remain. Recommendations: Enhance the standardization and thoroughness of compliance and review processes for Gen AI tool procurement.",
              Mature: "Description: There are comprehensive and well-established compliance standards and review processes for Gen AI procurement. Evidence: Procurement processes are consistently executed with high adherence to established standards. Recommendations: Continuously monitor, review, and update procurement compliance procedures to ensure ongoing alignment with best practices and evolving standards.",
            },
          },
          {
            id: "2.1.3",
            title: "Asset Evaluation and Upgrade Protocols: Implementing protocols for evaluating, upgrading, and renewing assets to include Gen AI capabilities.",
            descriptions: {
              Emerging: "Description: Limited processes exist for asset evaluation and upgrades specific to Gen AI. Evidence: There is inadequate consideration of Gen AI capabilities in current asset management. Recommendations: Develop initial protocols for assessing and upgrading assets to incorporate Gen AI features.",
              Developing: "Description: Protocols for asset evaluation and upgrades, with some inclusion of Gen AI capabilities, are developing. Evidence: Protocols are in place but not fully comprehensive or systematically applied. Recommendations: Enhance and standardize protocols for asset evaluation and upgrades, ensuring consistent incorporation of Gen AI.",
              Mature: "Description: Comprehensive protocols for asset evaluation and upgrades exist, fully integrating Gen AI considerations. Evidence: There is a systematic and thorough evaluation of assets for Gen AI integration. Recommendations: Continuously review and update protocols to align with the latest Gen AI advancements and organizational needs.",
            },
          },
          {
            id: "2.1.4",
            title: "Vendor Notification Requirements: Requiring vendors to notify the district about the addition of Gen AI capabilities to existing assets.",
            descriptions: {
              Emerging: "Description: There is a minimal or no requirement for vendors to inform the district about Gen AI capabilities in assets. Evidence: There is a lack of awareness about Gen AI enhancements in vendor-supplied assets. Recommendations: Establish basic protocols requiring vendor notification about Gen AI capabilities.",
              Developing: "Description: Requirements for vendor notification regarding Gen AI capabilities are developing. Evidence: Some vendor notifications are in place, but practices are not uniformly applied. Recommendations: Strengthen and standardize vendor notification requirements for Gen AI capabilities.",
              Mature: "Description: There are comprehensive requirements for vendor notification about Gen AI enhancements. Evidence: Systematic and effective communication from vendors regarding Gen AI capabilities. Recommendations: Continuously evaluate and update vendor notification protocols to reflect current Gen AI developments.",
            },
          },
          {
            id: "2.1.5",
            title: "Data Management and Privacy: Ensuring that data management and privacy are central considerations in the procurement of Gen AI tools.",
            descriptions: {
              Emerging: "Description: There is limited focus on data management and privacy during the procurement process. Evidence: Data management and privacy are not central considerations in procurement decisions. Recommendations: Begin to prioritize data management and privacy in the procurement of Gen AI tools.",
              Developing: "Description: Attention to data management and privacy in the procurement process is improving. Evidence: Consideration of data management and privacy is increasing, but integration is not fully comprehensive. Recommendations: Further integrate data management and privacy considerations into procurement practices.",
              Mature: "Description: There is advanced integration of data management and privacy into procurement decisions. Evidence: Data management and privacy are central and consistent elements of the procurement process. Recommendations: Continually lead and adapt data management and privacy practices in line with evolving technologies and standards.",
            },
          },
          {
            id: "2.1.6",
            title: "Vendor Relationship Management: Including guidelines for managing ongoing relationships with Gen AI tool vendors, ensuring continuous alignment with district goals and standards.",
            descriptions: {
              Emerging: "Description: Initial efforts exist to establish guidelines for vendor relationships, with a limited focus on Gen AI alignment. Evidence: Vendor relationships are not strategically managed for Gen AI tool integration. Recommendations: Develop basic guidelines for managing vendor relationships and ensuring alignment with district goals.",
              Developing: "Description: Practices for managing vendor relationships with a focus on Gen AI alignment are developing. Evidence: Management of vendor relationships have improved, but are not fully aligned with Gen AI objectives. Recommendations: Enhance guidelines and practices for vendor relationship management, focusing on continuous alignment with district goals.",
              Mature: "Description: Management of vendor relationships is comprehensive and fully aligned with Gen AI goals and district standards. Evidence: Effective and strategic vendor relationship management is in line with Gen AI objectives. Recommendations: Continuously review and evolve vendor management strategies to maintain alignment with district goals and Gen AI advancements.",
            },
          },
          {
            id: "2.1.7",
            title: "Sustainability Considerations: Addressing the environmental impact of Gen AI tools, encouraging the selection of sustainable and energy-efficient options.",
            descriptions: {
              Emerging: "Description: There is minimal consideration of sustainability in the selection of Gen AI tools. Evidence: There is a lack of emphasis on the environmental impact of Gen AI tools. Recommendations: Begin to incorporate sustainability considerations into the procurement process.",
              Developing: "Description: Awareness of sustainability in Gen AI procurement is increasing, but not yet a central focus. Evidence: Sustainability considerations are being integrated, but practices are not comprehensive. Recommendations: Strengthen the integration of sustainability considerations in Gen AI tool procurement.",
              Mature: "Description: There is a strong emphasis on sustainability and environmental impact in all Gen AI procurement decisions. Evidence: Sustainability is a central factor in Gen AI tool selection and procurement. Recommendations: Lead in sustainable procurement practices and regularly adapt to evolving environmental standards and technologies.",
            },
          },
        ],
      },
      {
        id: "2.2",
        title: "Staffing",
        subdomains: [
          {
            id: "2.2.1",
            title: "Continuous Professional Development: Emphasizing the need for ongoing training and professional development for staff to keep pace with evolving Gen AI technologies.",
            descriptions: {
              Emerging: "Description: There is initial recognition of the importance of ongoing professional development for Gen AI. Evidence: Structured training programs for staff on Gen AI technologies are lacking. Recommendations: Begin developing basic training and professional development programs focused on Gen AI.",
              Developing: "Description: Progress is being made in implementing ongoing training programs for Gen AI, but not yet fully comprehensive. Evidence: Training initiatives are present but need further development to cover all aspe cts of Gen AI. Recommendations: Expand and enhance professional development programs to encompass a broader range of Gen AI topics.",
              Mature: "Description: Comprehensive and ongoing professional development programs for Gen AI are wellestablished. Evidence: Staff are regularly trained and kept up-todate with the latest Gen AI advancements. Recommendations: Continually adapt and enhance professional development programs to keep pace with evolving Gen AI technologies.",
            },
          },
          {
            id: "2.2.2",
            title: "Staff Well-being and Change Management: Including strategies for addressing the impact of Gen AI on staff well-being and the importance of effective change management.",
            descriptions: {
              Emerging: "Description: Early awareness of the impact of Gen AI on staff wellbeing exists, but there are minimal change management strategies. Evidence: There are insufficient measures in place to address staff concerns and changes due to Gen AI. Recommendations: Start formulating strategies to support staff well-being and effective change management in the context of Gen AI.",
              Developing: "Description: Strategies for staff well-being and change management in response to Gen AI are developing. Evidence: Some measures are in place to support staff, but more systematic change management is needed. Recommendations: Strengthen change management strategies and initiatives to better support staff well-being during Gen AI integration.",
              Mature: "Description: Robust strategies and practices are in place for staff well-being and effective change management regarding Gen AI. Evidence: Strong support systems and change management protocols ensure staff well-being during Gen AI adoption. Recommendations: Regularly review and refine strategies to maintain staff well-being and effective change management as Gen AI evolves.",
            },
          },
          {
            id: "2.2.3",
            title: "Workforce Skills Assessment and Development: Evaluating and enhancing staff skills for Gen AI.",
            descriptions: {
              Emerging: "Description: There is a basic evaluation of staff skills related to Gen AI, with minimal development initiatives. Evidence: Staff skills in Gen AI are not systematically assessed or developed. Recommendations: Start assessing workforce skills for Gen AI and initiate basic development programs.",
              Developing: "Description: Progress is being made in assessing and developing workforce skills for Gen AI, but not fully comprehensive. Evidence: There is an increased focus on skill development, yet coverage of all relevant Gen AI skills is lacking. Recommendations: Expand and deepen workforce skills assessment and development programs for Gen AI.",
              Mature: "Description: There is a comprehensive assessment and development of workforce skills for Gen AI. Evidence: Staff skills are thoroughly aligned with Gen AI requirements. Recommendations: Continually adapt workforce development programs to align with evolving Gen AI technologies.",
            },
          },
          {
            id: "2.2.4",
            title: "Job Role Adaptation and Creation: Adapting and creating roles to support Gen AI operations.",
            descriptions: {
              Emerging: "Description: There is limited adaptation of job roles to accommodate Gen AI, with few new roles created. Evidence: Job roles are not effectively aligned with the districts Gen AI needs. Recommendations: Begin adapting existing job roles and considering the creation of new roles to support Gen AI operations.",
              Developing: "Description: The processes for adapting and creating job roles for Gen AI are developing, but not fully realized. Evidence: Some job roles are adapted, and new roles are emerging, but integration with Gen AI is not thorough. Recommendations: Enhance job role adaptation and creation processes to fully support Gen AI operations.",
              Mature: "Description: Well-established processes exist for adapting existing job roles and creating new roles for Gen AI. Evidence: Job roles are effectively aligned with and support Gen AI operations. Recommendations: Regularly review and update job roles to ensure ongoing alignment with Gen AI advancements and operational needs.",
            },
          },
          {
            id: "2.2.5",
            title: "Financial Planning for Staff Development: Budgeting for staff training and development in Gen AI.",
            descriptions: {
              Emerging: "Description: Budgeting for staff training in Gen AI is in the initial stages, with limited financial resources allocated. Evidence: Financial planning for staff development in Gen AI is not comprehensive or well-structured. Recommendations: Begin allocating budget and resources for staff training and development in Gen AI.",
              Developing: "Description: Budget and resource allocation for staff training in Gen AI is developing, but not yet fully adequate. Evidence: There is some financial investment in staff development for Gen AI, but gaps remain in coverage and depth. Recommendations: Increase and optimize budget allocation for comprehensive staff development in Gen AI.",
              Mature: "Description: There is comprehensive financial planning and resource allocation for staff training in Gen AI. Evidence: Robust budgeting and resource allocation support extensive staff development in Gen AI. Recommendations: Continually reassess and adapt financial planning to support evolving training needs in Gen AI.",
            },
          },
          {
            id: "2.2.6",
            title: "Data Preparation and Management Skills: Equipping staff with skills for effective data management in Gen AI contexts.",
            descriptions: {
              Emerging: "Description: There is a basic level of skill development for data management in Gen AI contexts. Evidence: Staff skills in data management for Gen AI are rudimentary and need enhancement. Recommendations: Initiate training programs to develop foundational data management skills for Gen AI.",
              Developing: "Description: There is progress in equipping staff with data management skills for Gen AI, but not yet comprehensive. Evidence: Improved staff skills in data management exist, yet a need for broader and deeper skill development exists. Recommendations: Enhance and expand training programs to cover advanced data management skills for Gen AI.",
              Mature: "Description: There are advanced skill development programs for data management in Gen AI contexts. Evidence: Staff possess comprehensive data management skills suitable for Gen AI applications. Recommendations: Regularly update and enhance training programs to keep staff skills aligned with the latest Gen AI data management trends.",
            },
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Data Readiness",
    sections: [
      {
        id: "3.1",
        title: "Data Governance",
        subdomains: [
          {
            id: "3.1.1",
            title: "Stewardship and Ownership of Data: Assigning clear responsibilities for data management.",
            descriptions: {
              Emerging: "Description: The district is in the initial steps to assign responsibilities for data management, with unclear or informal roles. Evidence: A lack of clear data stewardship and ownership leads to inconsistent data management. Recommendations: Begin establishing clear roles and responsibilities for data stewardship and ownership.",
              Developing: "Description: Structured roles for data stewardship and ownership are developing, but not fully comprehensive. Evidence: The assignment of data management responsibilities is improving, but some gaps remain. Recommendations: Enhance and clarify roles for data stewardship and ownership to cover all critical data assets.",
              Mature: "Description: Comprehensive and well-established roles for data stewardship and ownership are in place. Evidence: Data assets are clearly and effectively managed through assigned stewardship and ownership. Recommendations: Continuously review and refine data stewardship and ownership roles to align with evolving data needs and technologies.",
            },
          },
          {
            id: "3.1.2",
            title: "Policy Compliance and Enforcement: Ensuring adherence to data governance policies.",
            descriptions: {
              Emerging: "Description: There is a basic awareness of data governance policies, but limited enforcement mechanisms. Evidence: Data governance policies exist but are not consistently enforced or adhered to. Recommendations: Develop basic compliance and enforcement mechanisms for data governance policies.",
              Developing: "Description: Progress in enforcing data governance policies is developing, but enforcement is not yet systematic. Evidence: Data governance policies are more widely recognized, but adherence varies. Recommendations: Strengthen compliance mechanisms and ensure consistent enforcement of data governance policies.",
              Mature: "Description: There is a robust and systematic enforcement of data governance policies. Evidence: Data governance policies are strongly adhered to across the organization. Recommendations: Regularly update and reinforce enforcement mechanisms to maintain high compliance with data governance policies.",
            },
          },
          {
            id: "3.1.3",
            title: "Data Storage and Classification: Systematically storing and classifying district data.",
            descriptions: {
              Emerging: "Description: Basic or ad-hoc approaches are in place for data storage and classification. Evidence: Data is not systematically stored or classified, leading to inefficiencies and potential risks. Recommendations: Initiate systematic data storage and classification protocols to improve data organization and access.",
              Developing: "Description: Structured processes for data storage and classification are developing, but not fully comprehensive. Evidence: Improvements have been made in data organization, but gaps in systematic classification and storage persist. Recommendations: Enhance data storage and classification systems to ensure complete and organized data management.",
              Mature: "Description: There are comprehensive and systematic approaches to data storage and classification. Evidence: Data is efficiently organized and accessible, with robust classification systems in place. Recommendations: Continuously review and update data storage and classification protocols to align with evolving data requirements and technologies.",
            },
          },
          {
            id: "3.1.4",
            title: "Asset Lifecycle Management: Managing the lifecycle of data assets from creation to disposal.",
            descriptions: {
              Emerging: "Description: There is limited management of data asset lifecycles, with informal or inconsistent practices. Evidence: Lifecycle management of data assets is inadequate, resulting in inefficiencies and potential data loss. Recommendations: Develop basic asset lifecycle management practices to better manage data from creation to disposal.",
              Developing: "Description: The district is progressing in managing the lifecycle of data assets, but not fully integrated or systematic. Evidence: Some lifecycle management practices are in place, but not consistently applied across all data assets. Recommendations: Strengthen and standardize asset lifecycle management processes to cover all data assets effectively.",
              Mature: "Description: Management of the lifecycle of data assets is comprehensive, with systematic and integrated practices. Evidence: Management of data assets is effective and consistent throughout their lifecycle. Recommendations: Regularly reassess and refine asset lifecycle management strategies to stay aligned with best practices and technological advancements.",
            },
          },
          {
            id: "3.1.5",
            title: "Data Lifecycle Management: Emphasizing policies and practices for the entire lifecycle of data, from creation to disposal, ensuring data integrity and compliance throughout.",
            descriptions: {
              Emerging: "Description: There is an initial recognition of the importance of managing the entire data lifecycle, with rudimentary policies. Evidence: Inconsistent practices in data lifecycle management lead to potential data integrity issues. Recommendations: Establish basic policies and practices for managing the entire data lifecycle.",
              Developing: "Description: Processes and policies for data lifecycle management are developing, but not yet fully systematic. Evidence: Some improvements in data lifecycle management exist, but comprehensive coverage is lacking. Recommendations: Enhance and standardize data lifecycle management practices to ensure data integrity and compliance.",
              Mature: "Description: Management of the data lifecycle is comprehensive and systematic, ensuring data integrity and compliance. Evidence: Robust practices are in place for managing data throughout its lifecycle, with strong adherence to policies. Recommendations: Continuously review and update data lifecycle management policies to stay aligned with evolving data needs and regulations.",
            },
          },
          {
            id: "3.1.6",
            title: "Data Literacy Programs: Including initiatives to improve data literacy among staff, enhancing their understanding of data governance principles.",
            descriptions: {
              Emerging: "Description: There are limited efforts to enhance data literacy among staff, with minimal training initiatives. Evidence: There are low levels of data literacy among staff, affecting understanding of data governance. Recommendations: Initiate basic data literacy programs to improve staff understanding of data governance.",
              Developing: "Description: The district is progressing in implementing data literacy programs, but not yet comprehensive or widely accessible. Evidence: Awareness of data literacy is increasing, yet gaps in staff understanding and application persist. Recommendations: Expand and deepen data literacy initiatives to cover a broader range of data governance topics.",
              Mature: "Description: There are advanced and widespread data literacy programs for staff, fully integrated with data governance principles. Evidence: There is a high level of data literacy among staff, enhancing the overall effectiveness of data governance. Recommendations: Regularly update and enhance data literacy programs to keep pace with evolving data governance challenges and technologies.",
            },
          },
        ],
      },
      {
        id: "3.2",
        title: "Data Quality",
        subdomains: [
          {
            id: "3.2.1",
            title: "Data Audit and Quality Control: Regularly auditing data for accuracy and consistency.",
            descriptions: {
              Emerging: "Description: Basic or sporadic data audits are conducted, with limited quality control measures. Evidence: There is inconsistent data accuracy and quality due to infrequent audits. Recommendations: Initiate regular data auditing and establish basic quality control practices.",
              Developing: "Description: More structured data auditing and quality control processes are developing, but not fully comprehensive. Evidence: Data quality and consistency is improving, but gaps in auditing coverage remain. Recommendations: Enhance the frequency and thoroughness of data audits and strengthen quality control practices.",
              Mature: "Description: Comprehensive and systematic data audits and quality control measures are in place. Evidence: High standards of data accuracy and consistency are maintained through regular audits. Recommendations: Continuously review and update auditing and quality control practices to adapt to evolving data needs.",
            },
          },
          {
            id: "3.2.2",
            title: "Versioning and Source Management: Managing data versions and identifying data sources.",
            descriptions: {
              Emerging: "Description: Management of data versions and sources is ad-hoc, with minimal tracking. Evidence: Tracking data changes and sources is difficult, leading to potential data integrity issues. Recommendations: Start implementing versioning controls and source identification for data.",
              Developing: "Description: Management of data versions and sources is improving, but not yet fully systematic. Evidence: There is better tracking of data changes, but inconsistencies in versioning and source management persist. Recommendations: Standardize versioning and source management practices to ensure consistent data tracking.",
              Mature: "Description: There is systematic and thorough management of data versions and sources. Evidence: Data changes and sources are efficiently tracked and managed, ensuring data integrity. Recommendations: Regularly update versioning and source management practices to keep pace with technological advancements.",
            },
          },
          {
            id: "3.2.3",
            title: "Machine-Readability and Gen AI Compatibility: Ensuring data is in a format suitable for Gen AI use.",
            descriptions: {
              Emerging: "Description: The focus on ensuring data is in a format suitable for Gen AI use is limited. Evidence: Data formats are not consistently machine-readable, hindering Gen AI applications. Recommendations: Begin transitioning data into formats that are compatible with Gen AI technologies.",
              Developing: "Description: Efforts to convert data into machine-readable formats suitable for Gen AI are developing. Evidence: Progress has been made in data format conversion, but not all data is yet compatible with Gen AI. Recommendations: Expand and systematize the process of ensuring data compatibility with Gen AI.",
              Mature: "Description: There is a comprehensive approach to ensuring all data is in a machinereadable format compatible with Gen AI. Evidence: Data formats are uniformly suitable for Gen AI, facilitating efficient use. Recommendations: Continuously adapt data formats to align with evolving Gen AI technologies and standards.",
            },
          },
          {
            id: "3.2.4",
            title: "Data Standardization Practices: Implementing standardized data formats and practices to ensure consistency and reliability across different systems.",
            descriptions: {
              Emerging: "Description: The use of standardized data formats and practices is basic or inconsistent. Evidence: Lack of standardization leads to data inconsistencies and challenges in system integration. Recommendations: Start implementing basic standardized data formats and practices.",
              Developing: "Description: Progress is being made in adopting standardized data formats and practices, but not fully integrated. Evidence: Data consistency has improved, but some systems still lack standardization. Recommendations: Strengthen the adoption of standardized data formats and practices across all systems.",
              Mature: "Description: Standardized data formats and practices are advanced and consistently used across all systems. Evidence: There is a high level of data consistency and system interoperability due to standardization. Recommendations: Regularly review and update data standardization practices to maintain system compatibility and data reliability.",
            },
          },
          {
            id: "3.2.5",
            title: "Data Integrity Programs: Establishing programs to ensure ongoing data integrity, including regular audits and validation processes.",
            descriptions: {
              Emerging: "Description: Programs to maintain data integrity have been initially established, with infrequent audits and validation. Evidence: Data integrity is not consistently ensured, leading to potential inaccuracies. Recommendations: Develop basic data integrity programs, including regular audits and validation processes.",
              Developing: "Description: Enhancing data integrity programs are developing, but not yet fully systematic or comprehensive. Evidence: Data integrity is improving, but regular audits and validations are not fully implemented. Recommendations: Strengthen and standardize data integrity programs to ensure consistent and reliable data.",
              Mature: "Description: Comprehensive data integrity programs are in place, with systematic audits and validation. Evidence: High levels of data integrity are maintained through regular and thorough audits and validation. Recommendations: Continuously review and adapt data integrity programs to align with evolving data needs and technologies.",
            },
          },
        ],
      },
      {
        id: "3.3",
        title: "Data Privacy",
        subdomains: [
          {
            id: "3.3.1",
            title: "Privacy Vetting and Vendor Compliance: Assessing vendors for their data privacy practices.",
            descriptions: {
              Emerging: "Description: Vendors have been assessed at a basic level for data privacy practices, with limited vetting processes. Evidence: Vendors are vetted inconsistently, leading to potential privacy risks. Recommendations: Develop initial vetting procedures to assess vendors' data privacy practices.",
              Developing: "Description: More structured vendor vetting processes for data privacy are developing, but not comprehensive. Evidence: The vetting of vendors is improving, but some gaps in data privacy compliance remain. Recommendations: Enhance vendor vetting procedures to ensure a comprehensive assessment of data privacy practices.",
              Mature: "Description: There is a comprehensive and systematic vetting of vendors for data privacy compliance. Evidence: Consistent and thorough vetting ensures high standards of vendor data privacy practices. Recommendations: Continuously review and update vendor vetting processes to align with evolving privacy standards and regulations.",
            },
          },
          {
            id: "3.3.2",
            title: "Policy Updates and Training Compliance: Updating privacy policies and ensuring staff training.",
            descriptions: {
              Emerging: "Description: There are infrequent updates to privacy policies and minimal staff training on compliance. Evidence: Staff are not fully aware or trained on updated privacy policies. Recommendations: Initiate regular updates to privacy policies and implement basic training programs for staff.",
              Developing: "Description: Progress in updating privacy policies and staff training is developing, but not yet fully systematic. Evidence: Focus on privacy policy updates and training is increasing, but inconsistencies in staff knowledge and compliance persist. Recommendations: Strengthen the frequency and depth of privacy policy updates and staff training programs.",
              Mature: "Description: There are regular and systematic updates to privacy policies and comprehensive staff training. Evidence: Staff are well-informed and trained on the latest privacy policies, ensuring high compliance levels. Recommendations: Maintain and regularly update training programs to keep staff aligned with current privacy policies and practices.",
            },
          },
          {
            id: "3.3.3",
            title: "Third-Party Auditing and Contractual Rights: Conducting audits and enforcing data privacy in contracts.",
            descriptions: {
              Emerging: "Description: There is an initial implementation of third-party audits and contractual rights for data privacy, but processes are not fully developed. Evidence: Enforcement of data privacy in thirdparty contracts is inadequate, and auditing is limited. Recommendations: Establish basic procedures for third-party auditing and ensure data privacy is included in contracts.",
              Developing: "Description: Processes are developing for third-party auditing and reinforcing contractual rights for data privacy. Evidence: Some improvements have been made in contract enforcement and auditing, but not consistently applied. Recommendations: Enhance and standardize third-party auditing processes and contractual privacy provisions.",
              Mature: "Description: There is comprehensive and systematic third-party auditing and contractual enforcement for data privacy. Evidence: Consistent and effective enforcement of data privacy exists in all third-party contracts and regular audits. Recommendations: Continuously review and update auditing and contractual practices to maintain high standards of data privacy.",
            },
          },
          {
            id: "3.3.4",
            title: "Privacy by Design Principles: Integrating privacy by design principles in all Gen AI-related initiatives.",
            descriptions: {
              Emerging: "Description: There is an awareness of privacy by design principles, but limited integration into Gen AI initiatives. Evidence: Privacy considerations are not systematically incorporated into Gen AI-related projects. Recommendations: Start integrating privacy by design principles in the early stages of Gen AI-related initiatives.",
              Developing: "Description: Progress in integrating privacy by design principles is developing, but not yet fully embedded in all Gen AI initiatives. Evidence: The use of privacy by design is increasing, but the approach is not yet uniform across all projects. Recommendations: Expand the application of privacy by design principles to cover all aspects of Gen AI initiatives.",
              Mature: "Description: Privacy by design principles are fully integrated and standard in all Gen AI-related initiatives. Evidence: Privacy is a foundational aspect in the development and execution of all Gen AI projects. Recommendations: Regularly update and adapt privacy by design strategies to keep pace with evolving Gen AI technologies and privacy challenges.",
            },
          },
          {
            id: "3.3.5",
            title: "Privacy Impact Assessments: Regularly conducting privacy impact assessments to evaluate the privacy implications of new technologies or policies.",
            descriptions: {
              Emerging: "Description: Initial attempts to conduct privacy impact assessments exist, but these are infrequent and not comprehensive. Evidence: A lack of thorough assessment leads to potential privacy risks in new technologies or policies. Recommendations: Start implementing regular and basic privacy impact assessments for new technologies and policies.",
              Developing: "Description: A more structured approach to privacy impact assessments is developing, but not yet fully integrated into all new initiatives. Evidence: Some privacy assessments have been conducted, but coverage and depth are not sufficient. Recommendations: Enhance the scope and frequency of privacy impact assessments to cover all new technologies and policies.",
              Mature: "Description: Comprehensive and regular privacy impact assessments are integrated into all new technology and policy implementations. Evidence: Privacy risks are effectively identified and mitigated in all new initiatives. Recommendations: Continuously adapt and refine privacy impact assessment processes to align with emerging technologies and evolving privacy concerns.",
            },
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Technical Readiness",
    sections: [
      {
        id: "4.1",
        title: "Identity and Access Management",
        subdomains: [
          {
            id: "4.1.1",
            title: "Role-Based Data Access Controls: Implementing access controls based on user roles.",
            descriptions: {
              Emerging: "Description: There is a basic implementation of role-based access controls, with limited coverage and structure. Evidence: Access control is inconsistent, leading to potential security risks and data breaches. Recommendations: Develop initial role-based access control systems to improve security and compliance.",
              Developing: "Description: Role-based access controls are improving, but not yet fully comprehensive or integrated. Evidence: Access control has been improved, but gaps in role definition and enforcement remain. Recommendations: Standardize and expand role-based access controls to cover all critical systems and data.",
              Mature: "Description: Comprehensive and well-structured role-based access control systems are in place. Evidence: Role-based access controls are effectively managing user access and enhancing security and compliance. Recommendations: Continuously review and update access control systems to adapt to changing roles and security needs.",
            },
          },
          {
            id: "4.1.2",
            title: "Integration with Authentication Systems: Ensuring Gen AI tools work with existing authentication systems.",
            descriptions: {
              Emerging: "Description: There is minimal integration of Gen AI tools with existing authentication systems. Evidence: Gen AI tools are not fully secure or aligned with current authentication protocols. Recommendations: Start aligning Gen AI tool integration with existing authentication systems.",
              Developing: "Description: A better integration of Gen AI tools with authentication systems is developing, but integration is partial. Evidence: Some progress has been made in aligning Gen AI tools with authentication protocols, but inconsistencies remain. Recommendations: Strengthen integration efforts to ensure full compatibility of Gen AI tools with authentication systems.",
              Mature: "Description: A full and seamless integration of Gen AI tools with existing authentication systems is in place. Evidence: Gen AI tools are consistently secure and aligned with authentication protocols. Recommendations: Maintain and continuously enhance the integration of Gen AI tools with authentication systems.",
            },
          },
          {
            id: "4.1.3",
            title: "Continuous Access Evaluation: Implementing processes for ongoing evaluation and adjustment of access controls in response to changes in user roles and system updates.",
            descriptions: {
              Emerging: "Description: Initial efforts to evaluate and adjust access controls exist, but processes are ad-hoc and reactive. Evidence: Access controls are not consistently evaluated or updated, leading to security gaps. Recommendations: Develop a basic framework for ongoing evaluation and adjustment of access controls.",
              Developing: "Description: Structured processes for continuous access evaluation are developing, but not yet fully systematic. Evidence: Some improvements in access control evaluation exist, but comprehensive and proactive adjustment is lacking. Recommendations: Enhance and systematize continuous access evaluation processes to respond to user and system changes.",
              Mature: "Description: Comprehensive and proactive processes for continuous access evaluation and adjustment exist. Evidence: Access controls are regularly evaluated and adjusted, ensuring ongoing security and relevance. Recommendations: Continuously review and refine access evaluation processes to adapt to evolving user roles and system updates.",
            },
          },
          {
            id: "4.1.4",
            title: "Integration with Emerging Technologies: Ensuring that access management systems are adaptable to integrate with future technological advancements.",
            descriptions: {
              Emerging: "Description: There is limited consideration of the integration of access management systems with emerging technologies. Evidence: Access management systems are not fully prepared for future technological changes. Recommendations: Start planning for the adaptability of access management systems to new technologies.",
              Developing: "Description: Progress has been made in planning for the integration of access management systems with emerging technologies. Evidence: There are increased efforts to align access management with new technologies, but integration is not comprehensive. Recommendations: Strengthen strategies to ensure access management systems are adaptable to future technological advancements.",
              Mature: "Description: There is advanced integration of access management systems with emerging technologies. Evidence: Access management systems are fully adaptable and aligned with current and future technologies. Recommendations: Maintain and continuously update integration strategies to stay ahead of technological trends.",
            },
          },
        ],
      },
      {
        id: "4.2",
        title: "Tracking & Monitoring",
        subdomains: [
          {
            id: "4.2.1",
            title: "Gen AI System Tracking and Usage Monitoring: Monitoring the use of Gen AI systems.",
            descriptions: {
              Emerging: "Description: There is basic monitoring of Gen AI system usage, with limited tracking mechanisms. Evidence: Inadequate tracking leads to insufficient oversight of Gen AI system usage. Recommendations: Develop initial systems for tracking and monitoring Gen AI usage.",
              Developing: "Description: More structured tracking and monitoring of Gen AI system usage is developing. Evidence: Tracking is improved, but comprehensive monitoring of all Gen AI systems is lacking. Recommendations: Enhance tracking systems to cover all Gen AI usage and ensure effective monitoring.",
              Mature: "Description: Comprehensive and systematic tracking and monitoring of all Gen AI system usage is in place. Evidence: There is effective oversight of Gen AI usage with robust monitoring systems. Recommendations: Continuously adapt and update tracking systems to align with changing Gen AI technologies and usage patterns.",
            },
          },
          {
            id: "4.2.2",
            title: "Non-Compliance Identification and Prevention: Identifying and preventing policy breaches.",
            descriptions: {
              Emerging: "Description: There are minimal efforts to identify and prevent policy breaches related to Gen AI. Evidence: Potential policy violations are not effectively detected or prevented. Recommendations: Establish basic protocols for identifying and preventing non-compliance.",
              Developing: "Description: Efforts to identify and prevent non-compliance are increasing, but processes are not fully systematic. Evidence: Some measures are in place for policy enforcement, but consistency in identification and prevention is needed. Recommendations: Standardize and strengthen non-compliance identification and prevention strategies.",
              Mature: "Description: Processes for identifying and preventing policy breaches related to Gen AI are advanced. Evidence: Identification and prevention of non-compliance with policies are efficient and consistent. Recommendations: Regularly review and refine strategies to stay ahead of potential policy violations and emerging risks.",
            },
          },
          {
            id: "4.2.3",
            title: "Automated Compliance Monitoring: Developing systems for automated monitoring of Gen AI tool usage to ensure compliance with district policies.",
            descriptions: {
              Emerging: "Description: There is an initial setup of automated monitoring systems for Gen AI tool compliance, but lacking in depth and scope. Evidence: Automated oversight of Gen AI tool usage in compliance with policies is inadequate. Recommendations: Develop fundamental automated monitoring systems for policy compliance in Gen AI tool usage.",
              Developing: "Description: Automated compliance monitoring is improving, but is not yet fully integrated or comprehensive. Evidence: Some improvements are made in automated monitoring, but coverage and accuracy need enhancement. Recommendations: Expand and refine automated compliance monitoring systems for more effective oversight.",
              Mature: "Description: Comprehensive and integrated automated compliance monitoring systems are in place for Gen AI tools. Evidence: Effective and consistent monitoring ensures compliance with district policies. Recommendations: Continuously review and enhance automated systems to adapt to evolving Gen AI technologies and policy changes.",
            },
          },
          {
            id: "4.2.4",
            title: "Usage Analytics: Implementing analytics tools to provide insights into the effectiveness and efficiency of Gen AI tools.",
            descriptions: {
              Emerging: "Description: A basic use of analytics tools for evaluating Gen AI tools exists, with limited insights. Evidence: Data analysis is insufficient to gauge the effectiveness of Gen AI tools. Recommendations: Start implementing basic analytics tools to gather insights on Gen AI tool usage.",
              Developing: "Description: The use of analytics for deeper insights into Gen AI tool usage is developing, but not yet extensive. Evidence: A better understanding of Gen AI tool effectiveness is growing, but analytics are not fully exploited. Recommendations: Strengthen the implementation of analytics tools to provide more comprehensive insights.",
              Mature: "Description: Advanced analytics provide detailed insights into the efficiency and effectiveness of Gen AI tools. Evidence: Comprehensive analysis offers actionable insights for optimizing Gen AI tool usage. Recommendations: Regularly update analytics tools and methodologies to capture evolving trends and usage patterns.",
            },
          },
        ],
      },
      {
        id: "4.3",
        title: "Technical Controls",
        subdomains: [
          {
            id: "4.3.1",
            title: "Ancillary Architecture Evaluation: Assessing additional infrastructure needs for Gen AI.",
            descriptions: {
              Emerging: "Description: An initial assessment of infrastructure needs for Gen AI has been made, but lacks depth and comprehensiveness. Evidence: There is insufficient evaluation of ancillary architecture, potentially leading to inadequate infrastructure for Gen AI. Recommendations: Develop basic procedures for assessing additional infrastructure needs for Gen AI.",
              Developing: "Description: A more structured assessment of infrastructure needs is developing, but not yet fully integrated with Gen AI requirements. Evidence: Evaluation of ancillary architecture is improved, but some infrastructure gaps remain. Recommendations: Enhance infrastructure assessment processes to fully support Gen AI initiatives.",
              Mature: "Description: There is a comprehensive and integrated assessment of all infrastructure needs for effective Gen AI deployment. Evidence: Ancillary architecture fully supports Gen AI requirements, ensuring robust and efficient operation. Recommendations: Continuously review and adapt infrastructure assessment to align with evolving Gen AI technologies and needs.",
            },
          },
          {
            id: "4.3.2",
            title: "Technical Control Implementation and Review: Implementing and reviewing technical controls.",
            descriptions: {
              Emerging: "Description: Technical controls for Gen AI are implemented at a basic level, with limited review processes. Evidence: Technical controls are not fully effective or regularly reviewed, leading to potential security risks. Recommendations: Start establishing and reviewing technical controls to enhance Gen AI security and functionality.",
              Developing: "Description: The implementation and review of technical controls are being improved, but not yet comprehensive. Evidence: Some improvements in technical safeguards exist, but consistent review and updating are needed. Recommendations: Strengthen and regularly review technical controls to ensure ongoing effectiveness and alignment with Gen AI developments.",
              Mature: "Description: There is advanced implementation and regular review of technical controls for Gen AI. Evidence: Technical controls are effectively safeguarding Gen AI systems, with ongoing monitoring and updating. Recommendations: Maintain and continuously refine technical control processes to stay ahead of security and functional requirements.",
            },
          },
          {
            id: "4.3.3",
            title: "Interoperability Assessment: Conducting assessments to ensure that new Gen AI tools are compatible with existing district systems and infrastructure.",
            descriptions: {
              Emerging: "Description: Initial assessments of interoperability between new Gen AI tools and existing systems are basic and sporadic. Evidence: Potential compatibility issues with integrating Gen AI tools into the current infrastructure exist. Recommendations: Develop a fundamental process for assessing the interoperability of Gen AI tools with existing systems.",
              Developing: "Description: More structured processes for assessing interoperability are developing, but not comprehensive. Evidence: Some progress exists in ensuring compatibility, but gaps in interoperability assessments exist. Recommendations: Enhance the scope and thoroughness of interoperability assessments to ensure seamless integration.",
              Mature: "Description: There is a comprehensive and systematic assessment of interoperability for all new Gen AI tools. Evidence: Gen AI tools are effectively integrated with existing systems, ensuring full compatibility. Recommendations: Continuously update and refine interoperability assessments to align with evolving technologies and system changes.",
            },
          },
          {
            id: "4.3.4",
            title: "Sustainability and Environmental Impact: Including considerations for the environmental impact of Gen AI tools, focusing on sustainability.",
            descriptions: {
              Emerging: "Description: There is minimal consideration of the environmental impact of Gen AI tools, with limited focus on sustainability. Evidence: The sustainability and environmental impact of Gen AI tools are not adequately addressed. Recommendations: Initiate basic strategies to evaluate and minimize the environmental impact of Gen AI technologies.",
              Developing: "Description: A focus on sustainability and environmental impact is increasing, but practices are not fully integrated. Evidence: Awareness of sustainability is growing, but consistent application across Gen AI tools is lacking. Recommendations: Strengthen sustainability strategies to cover all aspects of Gen AI tool deployment.",
              Mature: "Description: There is an advanced and integrated consideration of sustainability and environmental impact in all Gen AI tool deployments. Evidence: Sustainability is a core aspect of Gen AI tool selection and usage, minimizing environmental impact. Recommendations: Regularly reassess and adapt sustainability strategies to align with current and future environmental standards.",
            },
          },
        ],
      },
      {
        id: "4.4",
        title: "Hallucinations of Inappropriate Content",
        subdomains: [
          {
            id: "4.4.1",
            title: "Content Moderation and Human Oversight: Establishing systems for content review and moderation.",
            descriptions: {
              Emerging: "Description: There is an initial establishment of content moderation systems, with limited human oversight. Evidence: Content moderation is inadequate, leading to potential exposure to inappropriate content. Recommendations: Develop basic content moderation systems with some level of human oversight.",
              Developing: "Description: More structured content moderation processes are developing, but not yet fully comprehensive. Evidence: Content moderation is improved, but gaps in human oversight exist. Recommendations: Enhance content moderation systems and ensure consistent human oversight across all platforms.",
              Mature: "Description: Comprehensive and systematic content moderation systems are in place with robust human oversight. Evidence: There is effective management of inappropriate content with consistent human review and moderation. Recommendations: Continuously review and update content moderation systems to adapt to new challenges and technologies.",
            },
          },
          {
            id: "4.4.2",
            title: "Vendor Moderation Guardrails: Requiring vendors to implement content moderation features.",
            descriptions: {
              Emerging: "Description: There are minimal requirements for vendors to implement content moderation features in their tools. Evidence: Vendors' tools lack sufficient content moderation, risking exposure to inappropriate content. Recommendations: Initiate basic requirements for vendors to include content moderation features.",
              Developing: "Description: There are increasing requirements for vendor-implemented content moderation, but not uniformly enforced. Evidence: Some vendors have improved content moderation, but consistency across tools is lacking. Recommendations: Strengthen vendor requirements for content moderation and ensure uniform enforcement.",
              Mature: "Description: Advanced and consistent requirements are in place for vendors to implement robust content moderation features. Evidence: Vendors' tools uniformly include effective content moderation, minimizing exposure to inappropriate content. Recommendations: Regularly reassess vendor requirements for content moderation to align with evolving standards and technologies.",
            },
          },
          {
            id: "4.4.3",
            title: "Feedback and Reporting Mechanisms: Establishing clear mechanisms for staff and students to report inappropriate content or hallucinations.",
            descriptions: {
              Emerging: "Description: Basic systems are in place for reporting inappropriate content, but these are not widely known or used. Evidence: There is limited awareness and use of feedback and reporting mechanisms among staff and students. Recommendations: Develop and promote initial mechanisms for reporting inappropriate content or hallucinations.",
              Developing: "Description: More structured feedback and reporting systems are developing, but not yet fully effective. Evidence: Reporting mechanisms are improved, but comprehensive and proactive feedback collection is lacking. Recommendations: Enhance feedback and reporting systems to encourage more active use and responsiveness.",
              Mature: "Description: Comprehensive and well-utilized feedback and reporting mechanisms are in place for inappropriate content. Evidence: There is effective feedback collection and response, ensuring swift action on reported content issues. Recommendations: Continuously adapt feedback and reporting systems to changing needs and technologies.",
            },
          },
          {
            id: "4.4.4",
            title: "Community Engagement: Involving the broader school community in understanding and addressing the challenges of content moderation in Gen AI tools.",
            descriptions: {
              Emerging: "Description: There is minimal engagement with the school community on content moderation challenges in Gen AI. Evidence: The community lacks awareness and involvement in addressing content moderation issues. Recommendations: Start involving the school community in discussions and initiatives related to content moderation.",
              Developing: "Description: Efforts to engage the community in content moderation discussions are increasing but with limited engagement. Evidence: Some community involvement exists, but broader engagement and understanding are needed. Recommendations: Expand community engagement initiatives to cover a wider range of stakeholders and topics.",
              Mature: "Description: There is strong and continuous engagement with the school community on content moderation in Gen AI. Evidence: There is a high level of community involvement and understanding of content moderation challenges. Recommendations: Maintain and deepen community engagement efforts to foster a collaborative approach to content moderation.",
            },
          },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Security Readiness",
    sections: [
      {
        id: "5.1",
        title: "Security Safeguards",
        subdomains: [
          {
            id: "5.1.1",
            title: "Cybersecurity Leadership and Framework - Designating leadership and frameworks for cybersecurity.",
            descriptions: {
              Emerging: "Description: There is an initial establishment of cybersecurity leadership roles, with basic frameworks in place. Evidence: Cybersecurity leadership and frameworks are underdeveloped, leading to potential security gaps. Recommendations: Develop fundamental cybersecurity leadership roles and establish basic frameworks.",
              Developing: "Description: More structured cybersecurity frameworks are developing, but not fully comprehensive. Evidence: Improved cybersecurity governance exists, but gaps in framework effectiveness remain. Recommendations: Enhance cybersecurity frameworks and ensure they are comprehensive and regularly reviewed.",
              Mature: "Description: Comprehensive and well-established cybersecurity leadership and frameworks exist. Evidence: Cybersecurity is effectively governed and managed, ensuring robust protection. Recommendations: Continuously review and adapt cybersecurity frameworks to evolving threats and technologies.",
            },
          },
          {
            id: "5.1.2",
            title: "Gen AI-Specific Security Protections - Implementing specific security measures for Gen AI usage.",
            descriptions: {
              Emerging: "Description: Minimal implementation of specific security measures for Gen AI exists, with limited scope. Evidence: There are insufficient security protections for Gen AI applications, leading to vulnerabilities. Recommendations: Initiate the development of specific security measures tailored for Gen AI usage.",
              Developing: "Description: There is an increasing focus on Gen AI-specific security measures, but implementation is partial. Evidence: Some progress in Gen AI security has been made, but consistent and comprehensive protections are needed. Recommendations: Strengthen the implementation of Gen AI-specific security measures to ensure thorough coverage.",
              Mature: "Description: Advanced and fully implemented Gen AI-specific security measures are in place. Evidence: Gen AI applications are securely protected against a wide range of threats. Recommendations: Regularly update and refine Gen AI-specific security measures to stay ahead of emerging security challenges.",
            },
          },
          {
            id: "5.1.3",
            title: "Incident Response Planning - Developing and regularly updating an incident response plan that includes protocols for Gen AIrelated security incidents.",
            descriptions: {
              Emerging: "Description: A basic incident response plan is in place, but lacks specific protocols for Gen AIrelated incidents. Evidence: There is inadequate preparedness for Gen AI-related security incidents, leading to potential risks. Recommendations: Develop initial incident response protocols specifically for Gen AI-related scenarios.",
              Developing: "Description: More structured incident response plans are developing, including some Gen AI-specific protocols. Evidence: Some improvements in response readiness for Gen AI incidents have been made, but are not fully comprehensive. Recommendations: Enhance incident response planning to cover all potential Gen AIrelated security scenarios.",
              Mature: "Description: A comprehensive and regularly updated incident response plan is in place, fully encompassing Gen AI scenarios. Evidence: There is effective preparedness and rapid response capability for any Gen AI-related security incidents. Recommendations: Continuously review and adapt the incident response plan to evolving Gen AI technologies and threats.",
            },
          },
          {
            id: "5.1.4",
            title: "Regular Security Audits - Implementing a schedule for regular security audits to assess the effectiveness of existing safeguards and identify areas for improvement",
            descriptions: {
              Emerging: "Description: There are infrequent security audits, with limited focus on Gen AI systems and safeguards. Evidence: Security audits are not effectively assessing the robustness of Gen AI safeguards. Recommendations: Initiate a regular schedule for security audits that includes a specific focus on Gen AI systems.",
              Developing: "Description: There is an increasing frequency and scope of security audits, but not yet fully encompassing Gen AI systems. Evidence: Assessment of security measures is better, but comprehensive audits of Gen AI systems are lacking. Recommendations: Expand the scope and depth of security audits to thoroughly assess Gen AI systems and safeguards.",
              Mature: "Description: Regular and comprehensive security audits are being made, fully integrating the assessment of Gen AI systems and safeguards. Evidence: A thorough and effective evaluation of all security measures is being made, ensuring robust protection of Gen AI systems. Recommendations: Maintain a consistent schedule for comprehensive security audits and adapt as needed to new security challenges.",
            },
          },
        ],
      },
      {
        id: "5.2",
        title: "Cybersecurity Training",
        subdomains: [
          {
            id: "5.2.1",
            title: "Role-Based Cybersecurity Education - Tailoring cybersecurity training to different roles.",
            descriptions: {
              Emerging: "Description: Basic cybersecurity training is in place, but not tailored to specific roles within the organization. Evidence: Lack of role-specific training leads to uneven cybersecurity knowledge and practices. Recommendations: Initiate the development of role-based cybersecurity education programs.",
              Developing: "Description: More structured role-based cybersecurity training is developing, but not yet fully effective. Evidence: Role-specific training has improved, but gaps in coverage and depth remain. Recommendations: Enhance and standardize role-based cybersecurity training to cover all relevant roles.",
              Mature: "Description: Comprehensive rolebased cybersecurity education exists and is tailored to all organizational roles. Evidence: Consistent and effective cybersecurity knowledge and practices are evident across all roles. Recommendations: Continuously review and adapt role-based training to changing cybersecurity needs and technologies.",
            },
          },
          {
            id: "5.2.2",
            title: "Training Program Development and Delivery - Developing and delivering comprehensive cybersecurity training programs.",
            descriptions: {
              Emerging: "Description: Initial efforts in developing cybersecurity training programs exist, but these are not comprehensive or regularly updated. Evidence: Training programs are not fully effective in covering all aspects of cybersecurity in the Gen AI context. Recommendations: Develop foundational cybersecurity training programs that are relevant to Gen AI usage.",
              Developing: "Description: The development and delivery of cybersecurity training programs are improving, but not yet comprehensive. Evidence: Some progress in training program effectiveness exists, but consistent updating and coverage are needed. Recommendations: Strengthen the development and delivery of comprehensive cybersecurity training programs.",
              Mature: "Description: Advanced and regularly updated cybersecurity training programs are in place, covering all aspects of cybersecurity in Gen AI. Evidence: Training programs are highly effective in enhancing cybersecurity awareness and skills. Recommendations: Maintain and continuously enhance the development and delivery of cybersecurity training programs.",
            },
          },
          {
            id: "5.2.3",
            title: "Continuous Learning Framework - Establishing a continuous learning framework for cybersecurity, incorporating the latest trends and threats, including those related to Gen AI.",
            descriptions: {
              Emerging: "Description: Initial efforts to establish a continuous learning framework for cybersecurity exist, but are lacking in depth and Gen AI focus. Evidence: Cybersecurity training is not keeping pace with evolving trends and threats, especially in Gen AI. Recommendations: Develop a basic continuous learning framework that includes updates on Gen AI-related cybersecurity.",
              Developing: "Description: A more structured continuous learning framework is being developed, but there is only partial integration of Gen AI trends. Evidence: Some progress exists in updating cybersecurity training, but comprehensive coverage of Gen AI threats is needed. Recommendations: Enhance the continuous learning framework to fully integrate Gen AI trends and threats.",
              Mature: "Description: There is a comprehensive and regularly updated continuous learning framework, fully incorporating Gen AI cybersecurity trends. Evidence: There is an effective adaptation of cybersecurity training to current and emerging threats, including those related to Gen AI. Recommendations: Continuously adapt the learning framework to stay ahead of the latest cybersecurity trends and threats.",
            },
          },
          {
            id: "5.2.4",
            title: "Community Awareness Programs - Developing programs to raise cybersecurity awareness among the broader school community, including parents and other stakeholders.",
            descriptions: {
              Emerging: "Description: Minimal programs are in place to raise cybersecurity awareness among the school community. Evidence: There is limited awareness of cybersecurity issues among parents, students, and other stakeholders. Recommendations: Initiate basic awareness programs to improve community understanding of cybersecurity.",
              Developing: "Description: There are increasing efforts to develop community awareness programs, but not yet widespread or comprehensive. Evidence: There is a growing awareness among the community, but consistent and in-depth understanding is lacking. Recommendations: Expand and strengthen community awareness programs to cover a broader range of cybersecurity topics.",
              Mature: "Description: Advanced and widespread community awareness programs exist, effectively raising cybersecurity awareness among all stakeholders. Evidence: There is a high level of community engagement and understanding of cybersecurity challenges. Recommendations: Maintain and continuously enhance community awareness programs to align with evolving cybersecurity landscapes.",
            },
          },
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Legal/Risk Readiness",
    sections: [
      {
        id: "6.1",
        title: "Legal Remediation",
        subdomains: [
          {
            id: "6.1.1",
            title: "Contractual Compliance with Gen AI Usage - Ensuring Gen AI use adheres to contractual agreements.",
            descriptions: {
              Emerging: "Description: Basic processes are in place for ensuring Gen AI usage adheres to contractual terms, but these are not fully developed. Evidence: There are potential risks of non-compliance with contractual agreements related to Gen AI. Recommendations: Develop initial procedures and checks to ensure contractual compliance in Gen AI usage.",
              Developing: "Description: More structured processes for contractual compliance in Gen AI usage are developing, but not comprehensive. Evidence: Compliance with contractual terms has improved, but gaps in enforcement and monitoring exist. Recommendations: Enhance mechanisms to ensure thorough contractual compliance for Gen AI usage.",
              Mature: "Description: Comprehensive and systematic processes are in place for ensuring contractual compliance in Gen AI usage. Evidence: Contractual terms are managed effectively, minimizing risks of non-compliance. Recommendations: Continuously review and adapt processes to maintain contractual compliance as Gen AI technologies evolve.",
            },
          },
          {
            id: "6.1.2",
            title: "Employee Policy Violation Consequences - Outlining and enforcing consequences for policy violations.",
            descriptions: {
              Emerging: "Description: There is minimal enforcement of consequences for employee policy violations related to Gen AI. Evidence: There is inconsistent application of consequences leading to potential policy breaches. Recommendations: Establish clear and enforceable consequences for Gen AI policy violations.",
              Developing: "Description: Efforts to enforce consequences for policy violations are increasing, but not yet fully systematic. Evidence: There is some improvement in enforcing policies, but consistent application of consequences is needed. Recommendations: Strengthen the enforcement and communication of consequences for policy violations.",
              Mature: "Description: Advanced and consistent enforcement of consequences is in place for employee policy violations related to Gen AI. Evidence: Policy breaches are deterred effectively, ensuring adherence to organizational standards. Recommendations: Regularly review and update policies and consequences to align with evolving Gen AI applications and legal requirements.",
            },
          },
          {
            id: "6.1.3",
            title: "Remediation Plans for Policy Violations - Developing plans to address and remediate policy violations.",
            descriptions: {
              Emerging: "Description: Basic plans are in place for addressing policy violations, but not specifically tailored for Gen AI. Evidence: Remediation plans are general and lack specificity for Gen AI-related issues. Recommendations: Develop initial remediation plans that specifically address policy violations in the Gen AI context.",
              Developing: "Description: More structured remediation plans for policy violations are developing, including some Gen AI-specific aspects. Evidence: Remediation efforts are improved, but not comprehensive for all Gen AI-related policy violations. Recommendations: Enhance remediation plans to cover a wider range of Gen AI policy violations and scenarios.",
              Mature: "Description: Comprehensive and effective remediation plans are in place for all types of policy violations related to Gen AI. Evidence: Policy violations are handled and resolved efficiently, minimizing legal risks in Gen AI usage. Recommendations: Regularly update remediation plans to address evolving Gen AI technologies and associated legal issues.",
            },
          },
          {
            id: "6.1.4",
            title: "Copyright Protection and Fair Use Education - Educating on copyright issues and fair use in the context of Gen AI.",
            descriptions: {
              Emerging: "Description: There is minimal education on copyright issues and fair use related to Gen AI. Evidence: There is a lack of awareness and understanding of copyright laws and fair use in the context of Gen AI. Recommendations: Initiate basic educational programs on copyright and fair use specifically for Gen AI usage.",
              Developing: "Description: Focus on copyright education is increasing, but not yet fully encompassing Gen AI-specific issues. Evidence: There is some improvement in copyright awareness, but an in-depth understanding of fair use in Gen AI is lacking. Recommendations: Expand educational efforts to fully cover copyright and fair use in the context of Gen AI.",
              Mature: "Description: There is an advanced and thorough education on copyright and fair use, specifically tailored for Gen AI contexts. Evidence: There is a high level of understanding and compliance with copyright laws and fair use among stakeholders. Recommendations: Continuously enhance copyright education to keep pace with evolving Gen AI applications and legal developments.",
            },
          },
          {
            id: "6.1.5",
            title: "Continuous Legal Education - Ensuring regular training and updates for the legal team on emerging legal issues related to Gen AI.",
            descriptions: {
              Emerging: "Description: There are initial efforts to provide regular legal training on Gen AI issues, but not comprehensive. Evidence: The legal team's knowledge of emerging Gen AI legal issues is limited. Recommendations: Develop foundational training programs for the legal team on Gen AI-related legal developments.",
              Developing: "Description: Developing structured legal education programs, but coverage of Gen AI issues is partial. Evidence: There is some improvement in the legal team's understanding of Gen AI issues, but not yet thorough. Recommendations: Enhance continuous legal education to cover all aspects of emerging Gen AI legal issues.",
              Mature: "Description: Comprehensive and regular legal education on all aspects of Gen AI legal issues. Evidence: The legal team is wellinformed and up-to-date with Gen AI legal developments. Recommendations: Continuously update legal education programs to stay aligned with the latest Gen AI legal trends and challenges.",
            },
          },
          {
            id: "6.1.6",
            title: "Stakeholder Communication Strategies - Developing strategies for effective communication with stakeholders about legal policies and their implications.",
            descriptions: {
              Emerging: "Description: Basic communication strategies are in place, but not effectively conveying legal policies to stakeholders. Evidence: Stakeholders are not fully informed about legal policies and their implications in Gen AI usage. Recommendations: Initiate the development of strategies to improve communication about legal policies with stakeholders.",
              Developing: "Description: Increasing efforts to develop effective communication strategies, but not yet comprehensive. Evidence: Better communication with stakeholders is evident, but consistent and clear messaging is needed. Recommendations: Strengthen communication strategies to effectively convey legal policies related to Gen AI to all stakeholders.",
              Mature: "Description: Advanced and wellstructured communication strategies effectively conveying legal policies to stakeholders. Evidence: Stakeholders have a clear understanding of legal policies and their implications in Gen AI usage. Recommendations: Regularly review and refine communication strategies to ensure clarity and effectiveness in conveying legal policies.",
            },
          },
        ],
      },
      {
        id: "6.2",
        title: "Risk Management",
        subdomains: [
          {
            id: "6.2.1",
            title: "Gen AI Integration in Audit Processes - Incorporating Gen AI considerations into auditing practices.",
            descriptions: {
              Emerging: "Description: Initial steps to include Gen AI considerations in audit processes are in place, but lacking comprehensive integration. Evidence: Audit processes do not fully account for the unique aspects of Gen AI, leading to potential oversight gaps. Recommendations: Develop basic procedures to integrate Gen AI considerations into audit practices.",
              Developing: "Description: More structured integration of Gen AI in audit processes is developing, but not yet fully systematic. Evidence: Some progress has been made in addressing Gen AI in audits, but comprehensive coverage is lacking. Recommendations: Enhance audit procedures to fully incorporate Gen AI considerations and risks.",
              Mature: "Description: There is a comprehensive and systematic integration of Gen AI considerations in all audit processes. Evidence: Audits effectively account for Gen AI, ensuring thorough evaluation and risk management. Recommendations: Regularly update audit processes to adapt to evolving Gen AI technologies and associated risks.",
            },
          },
          {
            id: "6.2.2",
            title: "Data Retention and Ownership Agreements - Managing agreements related to data retention and ownership",
            descriptions: {
              Emerging: "Description: Basic management of data retention and ownership agreements is in place, but not specifically addressing Gen AI implications. Evidence: There are potential risks in data management related to Gen AI due to inadequate agreements. Recommendations: Establish initial agreements and policies specifically for data retention and ownership in the Gen AI context.",
              Developing: "Description: Management of data retention and ownership agreements are improving, but not yet fully encompassing Gen AI complexities. Evidence: There is better handling of data agreements, but consistent and thorough coverage of Gen AI issues is needed. Recommendations: Strengthen policies and agreements to cover all aspects of data retention and ownership specific to Gen AI.",
              Mature: "Description: Advanced management of data retention and ownership agreements is evident, fully addressing Gen AI implications. Evidence: Data retention and ownership are effectively managed, minimizing risks associated with Gen AI data. Recommendations: Continuously review and adapt data agreements to align with changing Gen AI applications and legal requirements.",
            },
          },
          {
            id: "6.2.3",
            title: "Insurance Coverage for Gen AIRelated Risks - Integrating data loss notification protocols into onboarding and ongoing training programs.",
            descriptions: {
              Emerging: "Description: There is an initial evaluation of insurance policies to cover Gen AI-related risks, but coverage is limited. Evidence: Inadequate insurance coverage is in place for the unique risks associated with Gen AI. Recommendations: Begin assessing and updating insurance policies to include specific coverage for Gen AIrelated risks.",
              Developing: "Description: More comprehensive insurance coverage is developing for Gen AI-related risks, but not fully adequate. Evidence: Some improvements in insurance coverage exist, but gaps in Gen AI risk coverage remain. Recommendations: Enhance insurance policies to fully cover all potential risks associated with Gen AI.",
              Mature: "Description: Comprehensive insurance policies are in place, fully covering all risks associated with Gen AI usage. Evidence: Effective insurance coverage is in place for Gen AI, minimizing financial risks and liabilities. Recommendations: Regularly review and update insurance policies to stay aligned with evolving Gen AI technologies and associated risks.",
            },
          },
          {
            id: "6.2.4",
            title: "Comprehensive Risk Assessment Framework - Developing a framework for continuous risk assessment that includes Gen AI-related risks.",
            descriptions: {
              Emerging: "Description: A basic framework is in place for risk assessment, but does not fully include Gen AIrelated risks. Evidence: Risk assessment processes overlook some critical Gen AI-related risks. Recommendations: Develop an initial risk assessment framework that specifically incorporates Gen AI-related risks.",
              Developing: "Description: The risk assessment framework has been enhanced to include Gen AI-related risks, but integration is partial. Evidence: Risk assessment is improved for Gen AI, but comprehensive and systematic analysis is lacking. Recommendations: Strengthen the risk assessment framework to ensure it fully encompasses all Gen AI-related risks.",
              Mature: "Description: An advanced and integrated risk assessment framework exists, thoroughly including all Gen AI-related risks. Evidence: There is effective identification and management of all potential risks associated with Gen AI. Recommendations: Continuously adapt and update the risk assessment framework to reflect new Gen AI developments and emerging risks.",
            },
          },
          {
            id: "6.2.5",
            title: "Insurance Policy Review - Regularly reviewing and updating insurance policies to cover risks associated with Gen AI usage.",
            descriptions: {
              Emerging: "Description: There is an infrequent and basic review of insurance policies for Gen AI coverage. Evidence: Insurance policies may not adequately cover the specific risks associated with Gen AI. Recommendations: Initiate a process for regular review of insurance policies to ensure adequate coverage for Gen AIrelated risks.",
              Developing: "Description: There is an increasing frequency of insurance policy reviews, but they do not fully address all Gen AI-related risks. Evidence: Some improvements in insurance coverage for Gen AI have been made, but a comprehensive review is needed to cover all risks. Recommendations: Enhance the frequency and depth of insurance policy reviews to fully address Gen AI risks.",
              Mature: "Description: There are regular and comprehensive reviews of insurance policies to ensure full coverage of Gen AI-related risks. Evidence: Insurance policies are effectively updated to cover all aspects of risks associated with Gen AI. Recommendations: Maintain a consistent schedule for comprehensive insurance policy reviews to adapt to evolving Gen AI technologies and risks.",
            },
          },
        ],
      },
      {
        id: "6.3",
        title: "Loss Notification",
        subdomains: [
          {
            id: "6.3.1",
            title: "Formal Data Loss Notification Policies - Establishing policies for notifying stakeholders in the event of data loss.",
            descriptions: {
              Emerging: "Description: Basic data loss notification policies are in place, but not comprehensive or wellcommunicated. Evidence: There is the potential for inadequate or delayed notification to stakeholders in the event of data loss. Recommendations: Develop initial policies for formal data loss notification, ensuring clarity and prompt action.",
              Developing: "Description: More structured data loss notification policies are developed, but not yet fully effective. Evidence: Notification procedures are improved, but gaps in execution and communication remain. Recommendations: Enhance data loss notification policies to ensure timely and effective communication to all stakeholders.",
              Mature: "Description: Comprehensive and well-structured data loss notification policies are in place, effectively communicated, and executed. Evidence: In case of data loss, stakeholders are efficiently and promptly notified, minimizing potential impacts. Recommendations: Regularly review and update data loss notification policies to align with evolving data management practices and technologies.",
            },
          },
          {
            id: "6.3.2",
            title: "Compliance Monitoring and Training - Monitoring adherence to data loss notification policies and conducting related training",
            descriptions: {
              Emerging: "Description: There is minimal monitoring of compliance with data loss notification policies and limited training. Evidence: Adherence to notification policies is inconsistent, leading to potential gaps in response. Recommendations: Initiate processes for regular monitoring of policy compliance and basic training for relevant staff.",
              Developing: "Description: There are increasing efforts to monitor compliance with data loss notification policies and provide related training, but not comprehensive. Evidence: There is some improvement in compliance monitoring, but consistent training and adherence are needed. Recommendations: Strengthen monitoring and training processes to ensure full compliance with data loss notification policies.",
              Mature: "Description: There is regular and thorough monitoring of compliance with data loss notification policies, accompanied by comprehensive training. Evidence: There is a high level of compliance and staff preparedness for data loss notification, ensuring effective response. Recommendations: Maintain consistent monitoring and ongoing training to ensure adherence to data loss notification policies and preparedness for potential incidents.",
            },
          },
          {
            id: "6.3.3",
            title: "Data Loss Notification Onboarding and Training - Integrating data loss notification protocols into onboarding and ongoing training programs.",
            descriptions: {
              Emerging: "Description: There is a basic integration of data loss notification protocols into onboarding, but lacking in ongoing training. Evidence: New staff are minimally aware of data loss notification procedures, leading to potential gaps in response. Recommendations: Begin incorporating data loss notification protocols into both onboarding and ongoing training programs.",
              Developing: "Description: More structured integration of data loss notification training is developed, but not fully comprehensive. Evidence: There is some improvement in staff awareness, but consistent and thorough training is needed. Recommendations: Enhance the integration of data loss notification protocols into both onboarding and regular training.",
              Mature: "Description: There is a comprehensive integration of data loss notification training into onboarding and ongoing programs. Evidence: There is a high level of staff awareness and preparedness for data loss notification, ensuring effective response. Recommendations: Regularly update training programs to reflect evolving data loss scenarios and notification procedures.",
            },
          },
          {
            id: "6.3.4",
            title: "Automated Alert Systems - Implementing automated systems to detect and alert data loss incidents, especially those related to Gen AI.",
            descriptions: {
              Emerging: "Description: There is minimal use of automated systems to detect and alert data loss incidents, particularly those involving Gen AI. Evidence: There is a delayed or missed detection of data loss incidents, increasing the risk of unaddressed breaches. Recommendations: Initiate the development of automated alert systems for timely detection of data loss incidents.",
              Developing: "Description: There is increasing implementation of automated alert systems, but not yet fully effective for Gen AI incidents. Evidence: There is better detection of data loss incidents, but comprehensive and reliable automated systems are lacking. Recommendations: Strengthen automated alert systems to ensure effective detection and notification of all data loss incidents.",
              Mature: "Description: Advanced and highly effective automated alert systems are in place for all types of data loss incidents, including those related to Gen AI. Evidence: Rapid and accurate detection of data loss incidents, minimizing response time and potential damage. Recommendations: Continuously enhance and adapt automated systems to new technologies and emerging data loss risks.",
            },
          },
          {
            id: "6.3.5",
            title: "Community Engagement - Developing protocols for involving the broader school community in understanding and responding to data loss incidents.",
            descriptions: {
              Emerging: "Description: There are initial efforts to involve the school community in data loss incident awareness and response, but lacking depth and reach. Evidence: There is limited engagement and awareness of data loss issues among the school community. Recommendations: Start developing protocols to involve the school community in understanding and responding to data loss incidents.",
              Developing: "Description: More structured community engagement protocols are developing, but not yet fully effective. Evidence: Some improvement in community involvement and awareness is evident, but comprehensive engagement is needed. Recommendations: Enhance community engagement protocols to ensure broader and more effective involvement.",
              Mature: "Description: Comprehensive and well-executed community engagement protocols are in place for data loss incidents. Evidence: A high level of community involvement and understanding in data loss response is evident. Recommendations: Continuously review and adapt community engagement strategies to remain effective and inclusive.",
            },
          },
        ],
      },
    ],
  },
  {
    id: 7,
    title: "Academic AI Literacy Readiness",
    sections: [
      {
        id: "7.1",
        title: "AI Curriculum Integration",
        subdomains: [
          {
            id: "7.1.1",
            title: "Foundation: Establishing a baseline understanding of AI across all grade levels to ensure all students are equipped with essential AI knowledge.",
            descriptions: {
              Emerging: "Description: Basic AI concepts are introduced in isolated courses or modules, primarily in technology-related subjects. Evidence: AI topics are mentioned in lessons but lack integration into broader teaching practices. Recommendations: Begin to formalize AI education through workshops or guest lectures to raise awareness among both students and teachers.",
              Developing: "Description: Structured AI education is provided across multiple subjects, though integration into core subjects like math or science is still in progress. Evidence: AI concepts are taught in dedicated units or projects within courses, and some interdisciplinary linkage is evident. Recommendations: Develop a more systematic AI curriculum that connects with multiple disciplines and begins to align with state or national educational standards.",
              Mature: "Description: Comprehensive AI literacy is embedded throughout the curriculum, enhancing various subject areas and grade levels. Evidence: AI education is fully integrated into the school's curriculum framework, with continuous updates and alignments with the latest technological advancements and ethical considerations. Recommendations: Continue to innovate and update AI curriculum content regularly; ensure ongoing teacher training to keep pace with technological developments.",
            },
          },
          {
            id: "7.1.2",
            title: "Interdisciplinary Applications: Integrating AI learning into various subject areas, promoting creative problem-solving and application across the curriculum.",
            descriptions: {
              Emerging: "Description: There are initial attempts to apply AI in subject areas beyond computer science, usually through one-off projects or collaborations. Evidence: Occasional projects or lessons are available that involve AI applications in subjects like arts or social studies. Recommendations: Encourage teachers to collaborate across disciplines to design AI-inclusive projects, supported by professional development sessions.",
              Developing: "Description: AI tools and concepts are regularly integrated into multiple subjects, supported by collaboration between departments. Evidence: AI is used to enhance subjects like literature, history, and science, with projects that involve AI tools for data analysis, creative writing, or historical simulations. Recommendations: Formalize interdisciplinary projects as part of the curriculum and provide resources and platforms for teachers to share successful practices.",
              Mature: "Description: AI is a core element of interdisciplinary education, with robust collaborations across all subjects that enhance learning and creativity. Evidence: Established programs and consistent use of AI across disciplines demonstrate significant student engagement and enhanced learning outcomes. Recommendations: Continuously evaluate and refine interdisciplinary AI applications to ensure they remain cutting-edge and relevant, expanding into emerging areas like AI ethics and global impacts.",
            },
          },
          {
            id: "7.1.3",
            title: "Curriculum Development: Continuously updating and refining the educational curriculum to include the latest AI technologies and ethical considerations, ensuring relevance and comprehensiveness.",
            descriptions: {
              Emerging: "Description: Initial steps are taken to include AI topics in the curriculum, with some curriculum materials developed to introduce AI concepts. Evidence: A few AI-related curriculum resources exist, primarily in technology courses. Recommendations: Start developing a comprehensive curriculum development plan that includes AI literacy as a component across various grades and subjects.",
              Developing: "Description: AI concepts are integrated into the curriculum development process, with ongoing efforts to update and expand AI education materials. Evidence: AI education materials are under continuous review and updated, involving stakeholders such as curriculum developers and subject matter experts. Recommendations: Enhance the curriculum development process to ensure it is dynamic and responsive to new AI developments and educational needs.",
              Mature: "Description: AI is a fully integrated component of curriculum development, with strategic planning that anticipates future AI advancements and educational requirements. Evidence: The curriculum is frequently updated with the latest AI research and applications, and there is a proactive approach to incorporating future AI trends. Recommendations: Establish a regular review cycle for curriculum materials, engage with AI experts to foresee educational trends, and adapt the curriculum accordingly to maintain relevance and effectiveness.",
            },
          },
        ],
      },
      {
        id: "7.2",
        title: "Teacher Professional Development in AI",
        subdomains: [
          {
            id: "7.2.1",
            title: "Training/Professional Development Programs: Providing educators with comprehensive, ongoing training in AI technologies and pedagogical strategies to enhance their ability to effectively integrate AI into their teaching.",
            descriptions: {
              Emerging: "Description: Basic AI training/professional development programs are introduced, focusing on raising awareness among educators about AI tools and their potential uses in the classroom. Evidence: Occasional workshops or seminars are offered, primarily introductory in nature. Recommendations: Develop a structured training/professional development calendar that includes AI training at regular intervals and encourage all educators to participate.",
              Developing: "Description: Comprehensive AI training/ professional development programs are established, covering not only the use of AI tools but also pedagogical approaches to integrate AI into teaching. Evidence: There is increased participation in AI training sessions, with educators beginning to implement learned techniques in their teaching. Recommendations: Enhance training/professional programs to include advanced AI applications in education and assess the effectiveness of training through teacher feedback and student outcomes.",
              Mature: "Description: AI training programs are deeply embedded in training/professional development for educators, continuously updated to include the latest AI advancements and pedagogical research. Evidence: There are high levels of proficiency in AI integration among educators, with visible improvements in teaching effectiveness and student engagement. Recommendations: Maintain a cycle of continuous improvement for training/professional development programs, including peer-led training sessions and opportunities for educators to attend external AI education conferences.",
            },
          },
          {
            id: "7.2.2",
            title: "Resource Access: Ensuring that educators have continuous access to the latest AI resources and tools to support their professional development and classroom practices.",
            descriptions: {
              Emerging: "Description: Initial access to AI educational resources is provided, though these are limited and not fully integrated into educators' regular professional tools. Evidence: A basic set of AI tools and resources are available in some schools, but not widely distributed or integrated. Recommendations: Build partnerships with AI technology providers and educational content developers to expand the resources available to teachers.",
              Developing: "Description: There is improved access to a wider range of AI resources, including specialized software and online platforms, which are integrated into the school's professional development resources. Evidence: Educators regularly use AI resources for lesson planning and professional development. Recommendations: Continue to expand the library of resources, ensuring that they are relevant and adapted to the diverse needs of educators across subjects.",
              Mature: "Description: There is comprehensive access to a broad spectrum of high-quality AI resources that are fully integrated into the educational framework and professional development programs. Evidence: Resources are widely used and highly rated by educators; feedback mechanisms are in place to continuously assess and update the offerings. Recommendations: Keep evaluating and updating the available resources to stay ahead of technological advancements and educational needs; encourage sharing of best practices among educators.",
            },
          },
          {
            id: "7.2.3",
            title: "Community Building: Fostering a collaborative network of educators who share insights, experiences, and best practices in AI education to promote collective learning and innovation.",
            descriptions: {
              Emerging: "Description: There are initial efforts to build a community of educators interested in AI, typically through informal groups or networks. Evidence: There are small, localized groups or online forums where educators share experiences and resources related to AI. Recommendations: Formalize these groups into a structured community with regular meetings and shared objectives.",
              Developing: "Description: There is a growing professional community that supports the collaborative development and sharing of AIbased educational practices and resources. Evidence: There are regular community events and collaborative projects that enhance members' knowledge and application of AI in education. Recommendations: Develop leadership roles within the community, expand its reach to include more schools and districts, and introduce mentorship programs.",
              Mature: "Description: There is a robust, well-organized professional community that plays a crucial role in ongoing AI education and innovation within the educational sector. Evidence: There is a large and active community with strong ties between educators, frequent knowledge exchange, joint projects, and significant influence on AI educational policies. Recommendations: Sustain the vitality of the community by continually attracting new members, offering advanced training, and influencing broader educational and technological policies.",
            },
          },
        ],
      },
      {
        id: "7.3",
        title: "Ethical AI Use and Policy/Guidance Development",
        subdomains: [
          {
            id: "7.3.1",
            title: "Policy/Guidance Framework: Developing comprehensive policies to govern the ethical use of AI in educational settings, addressing issues like data privacy, bias, and transparency.",
            descriptions: {
              Emerging: "Description: There is an initial development of policies/guidance that address basic ethical considerations of AI use in education, focusing on privacy and data security. Evidence: Draft policies/guidance are in place, primarily reactive to immediate concerns with limited scope. Recommendations: Begin a systematic review of all AI interactions within the school system to develop comprehensive and proactive policies/guidance that cover all aspects of AI use.",
              Developing: "Description: A more comprehensive policy/guidance framework is developed that includes guidelines on the ethical use of AI, addressing concerns such as bias, transparency, and accountability. Evidence: Policies/Guidance are being actively discussed and refined with input from a broad range of stakeholders, including teachers, administrators, and possibly students. Recommendations: Implement training sessions for all stakeholders to understand and adhere to these policies/guidance; regularly update the policies/guidance as AI technology and its applications in education evolve.",
              Mature: "Description: An advanced, wellestablished policy/guidance framework is fully integrated into the school's operations, addressing all ethical aspects of AI use and supported by clear enforcement mechanisms. Evidence: Policies/Guidance are well understood and adhered to across the institution; regular audits show high compliance and understanding of ethical AI use. Recommendations: Continue to lead in ethical AI practices by regularly reviewing and revising policies/guidance to adapt to new AI developments and ethical considerations; engage in national or international discussions about ethical AI in education.",
            },
          },
          {
            id: "7.3.2",
            title: "Ethical Training: Providing indepth training for educators and staff on the ethical implications of AI, enhancing their understanding of responsible AI use and decision-making.",
            descriptions: {
              Emerging: "Description: Basic ethical training is provided to educators and administrative staff, focusing on the most immediate and obvious ethical issues related to AI use. Evidence: Some occasional workshops or seminars introduce the concept of ethical AI. Recommendations: Develop a formal ethical training program that is required for all new and existing staff, focusing on practical scenarios they might face.",
              Developing: "Description: More in-depth ethical training covers a wider range of issues, including bias in AI, the implications of AI decision-making, and the broader societal impacts. Evidence: Regular training sessions are part of professional development programs, with ongoing support and resources available. Recommendations: Incorporate ethical AI use cases into training sessions and provide opportunities for staff to discuss and explore real-life scenarios and their ethical implications.",
              Mature: "Description: Comprehensive ethical training is an integral part of the professional development of all staff, continuously updated to include the latest research and case studies. Evidence: There is a high level of engagement in ethical discussions, with staff capable of independently navigating complex ethical issues in AI. Recommendations: Lead initiatives to develop sectorwide ethical guidelines and training materials; share best practices and learning resources across schools and districts.",
            },
          },
          {
            id: "7.3.3",
            title: "Stakeholder Engagement: Engaging a broad spectrum of community stakeholders, including students, parents, and staff, in the development and refinement of AI policies to ensure diverse perspectives and needs are considered.",
            descriptions: {
              Emerging: "Description: There are initial efforts to engage stakeholders in discussions about ethical AI use, primarily through informal channels or ad-hoc meetings. Evidence: There is limited engagement with stakeholders, with some feedback collected through surveys or occasional meetings. Recommendations: Formalize stakeholder engagement processes by setting up regular forums and committees that include diverse groups, including students and parents.",
              Developing: "Description: There is regular and structured engagement with stakeholders, including dedicated committees or groups that focus on ethical AI use and policy development. Evidence: There is active participation from a diverse range of stakeholders in shaping AI policies and practices, with regular input and feedback mechanisms in place. Recommendations: Enhance stakeholder engagement by using advanced tools for collaboration and feedback collection; ensure all voices are heard and considered in policy development.",
              Mature: "Description: There is a deep, sustained engagement with stakeholders, who play a key role in continuously shaping and reviewing AI policies and practices. Evidence: Stakeholders are actively involved in policy creation and revision, with mechanisms in place to ensure their input is integral to decision-making processes. Recommendations: Continue to innovate in stakeholder engagement practices; set benchmarks for effective stakeholder involvement and share these practices within and beyond the educational sector.",
            },
          },
        ],
      },
      {
        id: "7.4",
        title: "Evaluating AI Impact",
        subdomains: [
          {
            id: "7.4.1",
            title: "Effectiveness Studies: Conducting rigorous studies to assess the educational impact and effectiveness of AI tools, ensuring they meet learning objectives and improve educational outcomes.",
            descriptions: {
              Emerging: "Description: Initial assessments are conducted to determine the basic effectiveness of AI tools in enhancing teaching and learning. Evidence: Simple surveys or feedback forms are used to gather anecdotal evidence from teachers and students about their experiences with AI tools. Recommendations: Establish baseline data on AI tool usage and impact. Start developing more structured effectiveness studies involving quantitative and qualitative metrics.",
              Developing: "Description: Systematic studies are conducted to measure the impact of AI on educational outcomes across various subjects and student demographics. Evidence: Data-driven analyses are conducted, and results are used to adjust AI tool deployment and teaching practices. Recommendations: Expand the scope of effectiveness studies to include long-term impact on learning outcomes and teacher satisfaction. Incorporate external benchmarks and comparisons with non-AI teaching methods.",
              Mature: "Description: Comprehensive, ongoing evaluations of AI tools are integrated into the school's continuous improvement processes. Effectiveness studies are aligned with educational standards and industry best practices. Evidence: There is regular publication of impact studies and case studies demonstrating clear benefits and areas for improvement. Data informs strategic decisions at the administrative level. Recommendations: Regularly update evaluation methodologies to incorporate the latest research in educational technology and pedagogy. Foster partnerships with academic institutions for independent evaluations",
            },
          },
          {
            id: "7.4.2",
            title: "Feedback Mechanisms: Establishing robust systems for collecting and analyzing feedback from educators, students, and other stakeholders to continuously improve AI implementations.",
            descriptions: {
              Emerging: "Description: Basic feedback mechanisms are in place, typically through direct channels such as email or informal meetings. Evidence: Limited, ad-hoc feedback is collected primarily from educators directly involved with AI tools. Recommendations: Develop a formal feedback system that allows for easy and anonymous input to encourage more comprehensive and honest feedback.",
              Developing: "Description: Structured feedback systems are established, including regular surveys and focus groups that engage a broader range of stakeholders. Evidence: Feedback is systematically collected and reviewed at regular intervals, with some responsiveness to the issues raised. Recommendations: Enhance feedback mechanisms to be more responsive and actionable. Implement changes based on feedback more rapidly and transparently communicate these changes and their rationale to stakeholders.",
              Mature: "Description: Advanced, dynamic feedback mechanisms are in place that provide real-time insights into the use and impact of AI tools. Feedback is integral to the ongoing development and adjustment of AI strategies. Evidence: There are high levels of stakeholder engagement in providing feedback, with a clear impact on policy and practice. Feedback leads to regular updates and improvements in AI applications. Recommendations: Continuously innovate in feedback collection and analysis techniques. Use AI and data analytics to enhance the processing and responsiveness to feedback.",
            },
          },
          {
            id: "7.4.3",
            title: "Adaptation and Improvement: Implementing a dynamic process for adapting AI tools and strategies based on data-driven insights and stakeholder feedback, ensuring ongoing relevance and effectiveness.",
            descriptions: {
              Emerging: "Description: Initial adaptations to AI tools and methods are made in response to basic feedback and obvious issues. Evidence: There are occasional updates to AI tools or teaching strategies based on limited feedback. Recommendations: Set up a dedicated team or role responsible for monitoring AI tool performance and leading adaptation efforts.",
              Developing: "Description: Systematic processes are in place for adapting AI usage based on comprehensive feedback and detailed effectiveness studies. Evidence: Regular updates to AI tools and educational practices are documented and communicated within the organization. Recommendations: Formalize the process of adaptation to ensure it is systematic and aligned with educational goals. Engage more deeply with users to understand their needs and experiences.",
              Mature: "Description: AI tool adaptation is a continuous, integral part of educational strategy, with clear policies and processes for implementing improvements based on robust data and stakeholder input. Evidence: AI adaptations are proactive and anticipate future needs and technological developments, with a clear positive impact on educational outcomes. Recommendations: Maintain a leadership role in educational technology by pioneering new practices and technologies. Share successful adaptations and improvements with the broader educational community.",
            },
          },
        ],
      },
      {
        id: "7.5",
        title: "AI Accessibility and Equity",
        subdomains: [
          {
            id: "7.5.1",
            title: "Infrastructure Improvement: Enhancing the necessary technological infrastructure to ensure that all students and staff have equitable access to AI tools and resources.",
            descriptions: {
              Emerging: "Description: Initial efforts are in place to improve infrastructure that supports basic AI accessibility, focusing on essential hardware and internet connectivity. Evidence: There is limited access to AI tools due to inadequate hardware or unreliable internet connections in some areas of the school district. Recommendations: Prioritize investments in critical infrastructure upgrades and seek funding or partnerships to ensure all students and educators have the necessary tools for AI access.",
              Developing: "Description: Significant infrastructure improvements are in place, with robust hardware and high-speed internet more widely available, enabling better access to AI tools. Evidence: There is more consistent access to AI tools across the district, with ongoing efforts to address remaining gaps in infrastructure. Recommendations: Continue to monitor and upgrade infrastructure as needed, ensuring that new technologies are accommodated and that access remains equitable.",
              Mature: "Description: State-of-the-art infrastructure is in place that fully supports the demands of advanced AI tools, with universal access across the district. Evidence: There are high levels of engagement with AI tools, with no reported access issues related to infrastructure. Recommendations: Maintain and future-proof infrastructure to ensure it continues to meet the evolving needs of educational technology. Regularly reassess the infrastructure to anticipate further advancements in AI.",
            },
          },
          {
            id: "7.5.2",
            title: "Inclusivity Measures: Implementing specific strategies to make AI tools accessible and useful for all students, including those with disabilities and those from diverse linguistic and cultural backgrounds.",
            descriptions: {
              Emerging: "Description: Basic measures to promote inclusivity, primarily focused on ensuring that AI tools are available to all students, including those with disabilities. Evidence: Initial policies aimed at reducing barriers to AI tool access, but implementation is inconsistent. Recommendations: Develop more comprehensive strategies and policies that specifically address the needs of diverse learners, including multilingual support and accommodations for students with disabilities.",
              Developing: "Description: More sophisticated inclusivity measures are in place, with AI tools increasingly adapted to meet the needs of a diverse student population. Evidence: Implementation of adaptive technologies and personalized learning tools that cater to various learning styles and abilities. Recommendations: Evaluate the effectiveness of inclusivity measures and continue to refine AI tools to ensure they support all students equally.",
              Mature: "Description: Full inclusivity in AI tool access and usage, with advanced adaptations that ensure all students benefit equally from AI technologies. Evidence: Strong performance and satisfaction indicators across all student groups, with AI tools effectively supporting a wide range of needs. Recommendations: Continue to lead in the development and implementation of inclusive educational technologies. Share best practices and innovations with other districts and educational bodies.",
            },
          },
          {
            id: "7.5.3",
            title: "Monitoring and Adjusting: Continuously monitoring the usage and impact of AI tools to identify and address any disparities, ensuring fairness and equity in AI-enhanced education.",
            descriptions: {
              Emerging: "Description: Initial monitoring of AI tool deployment to assess access and usage disparities. Evidence: Ad-hoc reports and feedback suggest uneven access and usage among different student groups. Recommendations: Establish regular monitoring systems to track AI tool access and usage, identify disparities, and develop targeted interventions.",
              Developing: "Description: Systematic monitoring is in place, with ongoing adjustments made to address identified access and usage issues. Evidence: Regular data collection and analysis inform targeted improvements, with some success in reducing disparities. Recommendations: Enhance data analysis capabilities to more precisely identify and address subtle disparities in AI tool access and usage.",
              Mature: "Description: Comprehensive, proactive monitoring and rapid adjustment processes ensure equitable access to and usage of AI tools across all demographics. Evidence: Data-driven approach results in high equity in access and positive outcomes across all student groups. Recommendations: Continue refining monitoring and adjustment processes, staying responsive to new challenges and opportunities as AI technology evolves.",
            },
          },
        ],
      },
      {
        id: "7.6",
        title: "Operational Automation",
        subdomains: [
          {
            id: "7.6.1",
            title: "Operational Automation: Implementing AIdriven solutions to automate routine administrative tasks, enhancing efficiency and accuracy across school operations.",
            descriptions: {
              Emerging: "Description: Initial integration of AI tools to automate basic administrative tasks such as attendance recording or basic data entry. Evidence: Some administrative tasks are partially automated, but many processes still require manual intervention. Recommendations: Identify additional routine administrative tasks that can be automated using AI. Begin planning and implementing more comprehensive AI solutions to enhance operational efficiency.",
              Developing: "Description: Increased use of AI for a wider range of administrative tasks, including more complex operations like scheduling and inventory management. Evidence: Notable improvements in administrative efficiency and accuracy. Reduced manual workloads for staff. Recommendations: Continue to expand AI integration into administrative processes. Evaluate the impact on staff workload and operational costs, adjusting AI strategies accordingly.",
              Mature: "Description: Comprehensive automation of administrative tasks across the board, with AI systems fully integrated into the schools operational infrastructure. Evidence: High level of operational efficiency and accuracy. Administrative tasks are largely automated, allowing staff to focus on higher-level responsibilities. Recommendations: Maintain and upgrade AI systems to ensure they stay current with the latest technology. Monitor and optimize AI operations to continue providing high levels of efficiency and support.",
            },
          },
          {
            id: "7.6.2",
            title: "Data Management: Utilizing AI to manage and analyze large datasets effectively, supporting informed decision-making and improving administrative processes.",
            descriptions: {
              Emerging: "Description: Basic use of AI to manage educational data, such as student performance and attendance. Evidence: Initial attempts at using AI to analyze and report on data, with mixed results. Recommendations: Develop a more structured approach to data management using AI, ensuring data quality and relevance.",
              Developing: "Description: More sophisticated data management systems are in place, with AI used to analyze trends and provide insights that inform decision-making. Evidence: Improved decision-making based on reliable data analysis. Greater confidence in the data provided by AI systems. Recommendations: Expand the use of AI in data management to include predictive analytics and other advanced techniques. Provide training for administrators on how to interpret and use AI-generated insights.",
              Mature: "Description: Use of advanced data management systems fully driven by AI, providing comprehensive insights and forecasts that are integral to strategic planning. Evidence: AI-driven data management is critical to operational success and strategic decision-making. Data is used proactively to improve educational outcomes and operational efficiency. Recommendations: Continue to innovate in the use of AI for data management. Regularly reassess and update systems to harness new AI capabilities and data sources.",
            },
          },
          {
            id: "7.6.3",
            title: "Strategic Planning: Integrating AI tools into strategic planning processes to optimize resource allocation, forecast future trends, and enhance overall institutional effectiveness.",
            descriptions: {
              Emerging: "Description: Initial use of AI to support basic strategic planning tasks, such as analyzing current resource allocation. Evidence: AI tools are used sporadically for planning, with limited impact on overall strategy formulation. Recommendations: Begin to integrate AI more deeply into the strategic planning process. Train leaders on the capabilities and potential of AI in strategic planning.",
              Developing: "Description: Increased integration of AI into strategic planning, with tools used to simulate outcomes and optimize resource distribution. Evidence: AI contributes to more informed and effective strategic decisions. Initial evidence of improved outcomes from AI-supported plans. Recommendations: Further develop the strategic use of AI, incorporating more complex modeling and scenario analysis. Ensure that AI tools are used to complement, not replace, human judgment.",
              Mature: "Description: Comprehensive use of AI in strategic planning, with AI systems fully integrated into the planning process, providing deep insights and forecasts. Evidence: AI is a key tool in formulating and adjusting strategy, clearly demonstrating value in optimizing outcomes and resource use. Recommendations: Recommendations: Continue to advance the use of AI in strategic planning. Stay abreast of developments in AI technology that could further enhance planning accuracy and effectiveness. ",
            },
          },
        ],
      },
    ],
  },
];

const DEPARTMENTS = [
  { id: 'exec-leadership', name: 'Executive Leadership', description: 'Domain 1 — Executive Leadership Readiness', domainIds: [1], members: 'Jason & Jen' },
  { id: 'operational', name: 'Operational Readiness', description: 'Domain 2 — Operational Readiness', domainIds: [2], members: 'Mike & Susan' },
  { id: 'data', name: 'Data Readiness', description: 'Domain 3 — Data Readiness', domainIds: [3], members: 'Jim & Jamey' },
  { id: 'technical', name: 'Technical Readiness', description: 'Domain 4 — Technical Readiness', domainIds: [4], members: '' },
  { id: 'security', name: 'Security Readiness', description: 'Domain 5 — Security Readiness', domainIds: [5], members: '' },
  { id: 'legal-risk', name: 'Legal/Risk Readiness', description: 'Domain 6 — Legal/Risk Readiness', domainIds: [6], members: 'Micki & Becky' },
  { id: 'academic-ai', name: 'Academic AI Literacy', description: 'Domain 7 — Academic AI Literacy Readiness', domainIds: [7], members: 'Emily & Sandee' },
];
