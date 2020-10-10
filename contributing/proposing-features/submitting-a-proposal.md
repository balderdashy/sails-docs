# Submitting a proposal

Before you begin the process of submitting a proposal, please give the information in [Proposing features and enhancements](https://sailsjs.com/documentation/contributing/proposing-features-enhancements) a read. It could save you a lot of time!

Now that you're certain a proposal is necessary, here's how to create one: 

First, navigate to the Sails repository and do a search in the open pull requests and issues to make sure that somebody else hasn't already proposed your feature. 
+ Many Sails contributors receive GitHub notifications every time a new comment is posted; out of consideration for these individuals, please do not `*bump*` or `:+1:` feature proposals. Instead, write a concise (3-5 sentences) explanation of your real-world use case for the feature.

If there is no existing pull request or issue for the feature you would like to add, please create an issue in the main Sails repository. 
+ Please make sure that your issue addresses the proposal _exclusively_. Mixing proposals with questions or bug fixes (or both!) is a great way to delay the resolution of all components of the issue. If you have a patch or question&mdash;related to the proposal or not&mdash;please address it in its own issue or pull request as appropriate.
+ The title of the issue should be a brief description of the proposed feature. See the title guidelines on the [Issue contributions](https://sailsjs.com/documentation/contributing/issue-contributions) page for guidance.
+ The description field of the issue should include the following:
  - A concise (3-5 sentences), high-level summary of the feature you are proposing, in which you describe a real-world use case where the Sails app you are building or maintaining would be improved by your proposed feature or change. 
  - A description in clear prose, and with links to relevant code files, of exactly why it is impossible (or burdensome to the point of absurdity) to implement your feature without changing Sails core. If this is not the case&mdash;that is, if it is possible to implement this feature as a plugin&mdash;please reconsider your proposed feature, as it is unlikely to be accepted by the core team. If you are the author of one or more plugins and feel that you or other users would benefit from having your work in Sails core, please contact the core team directly.
  - If possible, a specification for this feature, including its configuration, usage, and implementation. If you don't have time to write out a thorough specification, please mention this in your proposal; it should be made clear that the task of specification would fall to another contributer with a similar use case. 


Proposals that do not meet these guidelines will be closed with a response asking that the submitter review this contribution guide.  If this happens to you, please understand that _it is nothing personal_ and that it may even happen again.  Please realize that a tremendous amount of effort has been put into the existing plugin systems in Sails, so any proposed change to core must be carefully considered in relation to how it would affect existing plugins, apps, and future development of the framework.  Many Sails contributors have become intimately familiar with how the various systems in Sails interact and will be willing to help you out, but in order for that process to be efficient, it is important that all new features and enhancements follow a common set of ground rules.

> ###### If your feature proposal is accepted...
> Having your proposal accepted does not necessarily mean that you are responsible for _implementing_ the feature, and you certainly won't be responsible for _maintaining_ future changes which might affect that feature for all eternity.  _That_ privilege is reserved for Mike and the rest of the core team, which is why it is so important to spec out the vision for the usage, configuration, and implementation of your proposed feature from day one.  Working out this sort of a detailed proposal is not an easy task, and often involves more effort than the actual implementation.  If a proposal is accepted, it becomes part of the project's mission, and once a proposal is implemented and merged, the core team is committed to maintaining it as a part of Sails.

<docmeta name="displayName" value="Submitting a proposal">
