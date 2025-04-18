function extractTags(caption) {
    const regex = /#(\w+)/g;
    const matches = [];
    let match;
  
    while ((match = regex.exec(caption)) !== null) {
      matches.push(match[1]);
    }
  
    return matches;
  }
  

export default extractTags