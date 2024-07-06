# InstMsgGenerator
Tool to help generate test messages to work with instrumentation based upon its specs
This tool is meant to help with increasing effeciency with creating a working interface before the instrument is actually in place

### Current Status Of Project
- Users can generate ASTM messages for a Result Message or a Query Message. The frames required for each ASTM message type will be displayed to the user
- Users can select the amount of fields are needed for each frame and a second set of inputs will be displayed for each frame and the fields are numbered to ensure proper data entry
- Users can then enter data into each field and select the Generate Message button to generate a message based off of the entered data
- The message that is displayed can continue to be changed as needed, based upon the data entered, and can be re-generated as needed to confirm that the message is generated as expected
- Users can then encode that message, once it looks as the user expects, and this will add the low level tcp control characters and checksums to each frame and then request to save the data to file
  - NOTE: The encoding will occur but will not be present to the user in the generated message box. Please do not copy from that message box!

### Next Steps
- Currently, HL7 needs to be improved as how that data is transmitted on the TCP layer is different than ASTM and needs to be configured to accommodate the HL7 protocol.
- Update the message box to alert users to not copy from that field

<p><a href="https://instmsggenerator.pages.dev/" target="_blank" rel="noopener noreferrer">Click Here</a> to check what has been done so far!</p>
