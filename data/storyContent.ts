export interface ReflectPrompt {
  id: string;
  text: string;
  isHighlighted?: boolean;
}

export interface EvidenceItem {
  id: string;
  content: string;
}

export interface PartContent {
  title: string;
  paragraphs: string[];
  reflectPrompt?: ReflectPrompt;
  evidence?: {
    title: string;
    items: EvidenceItem[];
    sources?: string;
  };
  note?: {
    title: string;
    content: string;
  };
  italicText?: string;
  quote?: {
    text: string;
    author: string;
  };
}

export interface StoryContent {
  mainTitle: string;
  subtitle: string;
  introduction: string;
  part1: PartContent;
  part2: PartContent;
  part3: PartContent;
}

export const storyContent: StoryContent = {
  mainTitle: "The Data Gap",
  subtitle: "A Reflective Journey on Noticing What Others Don't",

  introduction: "Read this the way you'd read a short story or an article. When you reach a Reflect box, stop. Write what's actually true for you, not what sounds right. You'll have a conversation with Que, the socratic AI-agent. The conversation can go back-and-forth for some time; don't hurry, you'll know when the conversation is over. There is no word limit. There is no 'right' answer.",

  part1: {
    title: "Part I: The Moment of Noticing",
    paragraphs: [
      "The first time Priya noticed the gap, she was standing on a street she had lived on her whole life.",
      "She was twenty, home for the summer from university in another city, and she had downloaded a city planning app that her professor had assigned as a case study. The app aggregated open data (satellite imagery, census figures, infrastructure maps) and let users overlay different datasets on their own city. It was, her professor said, an example of civic technology done right: open-source, participatory, designed to empower citizens with the same information that municipal planners used.",
      "Priya opened it, typed in her address in the Govandi neighbourhood of Mumbai, and waited.",
      "The map that appeared showed a pale grid of streets and land parcels, roughly correct in outline but empty in a specific, deliberate way. The sabzi mandi (an informal farmers' market) where her mother bought vegetables every morning: absent. The community health post where she had got her vaccinations as a child: absent. The auto-rickshaw terminus that served as the de facto transit hub for tens of thousands of daily commuters: not there. The map showed her neighborhood as a quiet residential area. Her neighborhood was not, by any measure, quiet.",
      "It's wrong, she thought. But wrong how, exactly?",
      "She started looking. She found a research group at a Delhi university that had spent years documenting this exact phenomenon across Indian cities. She found UN reports on the relationship between data visibility and infrastructure investment. She found a paper that used the phrase 'data shadow' to describe the condition of places that exist in physical space but not in the datasets. She thought: that is a precise description of where I grew up.",
      "She also found data suggesting that this problem was not accidental. It was the predictable result of how data collection works: who has addresses in formal systems, who responds to official surveys, whose roads are paved and therefore photographically legible from satellites. The data shadow was, in other words, a perfect projection of existing socioeconomic inequalities she was intimately familiar with."
    ],
    italicText: "It's wrong, she thought. But wrong how, exactly?",
    reflectPrompt: {
      id: "q1",
      text: "Have you ever noticed a gap like this — between what was officially true and what you could see for yourself? It doesn't have to involve data or technology. It could be an institution, a narrative, a policy, an explanation. What did you notice, and why did it stay with you?",
      isHighlighted: true
    }
  },

  part2: {
    title: "Part II: What the Research Shows",
    paragraphs: [
      "Priya's story is not unusual. What she encountered has a name, a literature, and consequences that researchers have been documenting for decades. The problem runs deeper than bad maps.",
      "There is a large literature on participatory mapping: projects in which communities mapped their own neighborhoods, using local knowledge to fill in what satellite imagery missed. Some of these projects were remarkable: in Dharavi, Mumbai, community volunteers had produced maps of the settlement more accurate than any municipal survey. In Nairobi, youth mappers had done the same for the Kibera settlement. In Cape Town, a community data project had become the evidentiary basis for a successful legal challenge to a proposed eviction.",
      "Priya also found something the literature kept circling back to: many participatory mapping projects were launched, produced data, and had no discernible effect on people's lives. The data existed. The decisions continued as before. Researchers studying why point repeatedly to three factors: whether the data matched existing institutional workflows; whether community members had relationships with officials who had authority to act; and whether there was an organized constituency that could create consequences for non-response.",
      "The problem was rarely the data."
    ],
    evidence: {
      title: "Evidence — The Data Gap in Urban Planning",
      items: [
        { id: "f1", content: "Approximately one billion people live in informal settlements worldwide — roughly 25% of the global urban population. Yet these settlements are systematically underrepresented in the administrative datasets that cities use to plan infrastructure, allocate health resources, and target social programmes." },
        { id: "f2", content: "Official planning maps in cities like Mumbai systematically blank out informal settlements in the datasets used to allocate public services. A study of Mumbai's own maps found that entire neighbourhoods — those falling under the Slum Rehabilitation Agency — appear as unshaded, unmapped voids in the city's official accessibility data. The less formal a settlement's land tenure, the less likely it is to exist in any record that drives resource decisions." },
        { id: "f3", content: "In Mumbai, over half the city's population lives in informal settlements that occupy just 5% of the city's land — yet these areas are systematically denied legal access to piped water and sanitation infrastructure, the same infrastructure that is mapped and maintained for formal neighbourhoods." }
      ],
      sources: "Sources: UN-Habitat, World Cities Report 2022; Chakraborty, et al., Journal of Urban Management, 2015; Satterthwaite et al., One Earth, 2020"
    },
    reflectPrompt: {
      id: "q2",
      text: "Have you ever encountered a situation where the right answer — the clearly correct thing — was visible, but didn't change what happened? What did you make of that? Did it change how you thought about the problem, or about what you wanted to do?"
    }
  },

  part3: {
    title: "Part III: What Priya Did, and What Happened",
    paragraphs: [
      "By the end of her first week back home, Priya had filled a notebook. She had a working understanding of the academic literature. She had found three organisations in Mumbai doing related work. She had identified a specific piece of information — the actual number of residents and economic transactions in the farmers' market — that did not exist in any official dataset, that would be straightforward to produce with enough time and a working smartphone, and that would directly challenge the 'quiet residential area' classification the app had assigned to her neighborhood.",
      "She also had a problem that the literature had not solved for her: she had six weeks before she went back to university. She was studying economics, not urban planning. She had no funding. She had, as far as she could tell, no theory of change beyond 'this number should exist.'",
      "What she did have, was the question. She knew what was missing. She knew why it mattered. She did not know what to do about it yet. She went to find the woman who ran the farmers' market.",
      "Meena Tai (tai means aunt in Marathi) had managed the market for twenty-two years. She knew the number of stalls, the approximate turnover on a slow Tuesday versus a busy Saturday, the names of the three ward officials who had come to inspect the market in the last decade, and the outcomes of each inspection (none had resulted in any official documentation of the market's existence in city records).",
      "She was not surprised that the map did not show them.",
      "When they cannot see you, she told Priya, they cannot be responsible for you. That is not an accident.",
      "Priya asked if she could come back with a survey. Meena Tai said yes, and then asked a question that Priya spent the rest of the summer trying to answer: When you have your numbers — what happens next? Who are you taking them to, and why will they listen?",
      "Priya did the survey. Over four weeks, she and two friends conducted 187 interviews across the market and the surrounding residential area. They produced a dataset: stall counts, transaction volumes, employment figures, residential density. They uploaded it to OpenStreetMap. They submitted it to the BMC — the Brihanmumbai Municipal Corporation — which acknowledged receipt. They sent it to the app company, which thanked them and said they would review it in the next update cycle.",
      "Then she went back to university.",
      "The dataset exists. The app has not been updated. The BMC has not published any revised figures for the Govandi area. The market continues to operate. The infrastructure situation in the neighborhood is unchanged.",
      "Priya is now in her final year, writing a dissertation on the political economy of urban data in South Asia. She has been in contact with three other students — in Dhaka, in Nairobi, in São Paulo — who have done similar surveys in similar places and arrived at similar conclusions. They have been talking, slowly, about whether and how to connect what they are doing.",
      "She is not sure yet what that would look like. She knows the data exists. She has learned, the hard way, that the data existing and the data mattering are different questions. She has not stopped asking the second question."
    ],
    quote: {
      text: "When they cannot see you, they cannot be responsible for you. That is not an accident.",
      author: "Meena Tai"
    },
    note: {
      title: "A note before you respond",
      content: "Your responses are not being evaluated for what you know about urban data or civic technology. They are being read for what is true for you. Evaluators give more weight to honest ambiguity than to confident performance. Meena Tai's question — when you have the numbers, what happens next? — is one that nobody answers quickly."
    },
    reflectPrompt: {
      id: "q3",
      text: "Where are you in a story like this? You might be at the beginning, still searching for your question. You might be in the middle of something that isn't going the way you expected. You might be between attempts. Or you might just feel something pulling at you, without knowing yet what to do with it. Tell us honestly where you are. What is the problem you keep coming back to — and what, if anything, is stopping you from going further?"
    }
  }
};
