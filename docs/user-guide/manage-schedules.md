---
sidebar_position: 3
---

# Manage a schedule

You manage a schedule with the stablecoin and the decimal schedule id. The contracts are not deployed. These calls are the protocol behavior after deployment.

## Actions

| Action | Call | What it changes |
| --- | --- | --- |
| Add principal | `depositToken` | Increases the schedule balance |
| Change the purchase amount | `updatePurchaseAmount` | Sets the next gross purchase |
| Change the cadence | `updatePurchasePeriod` | Sets the next whole-day period |
| Pause or resume purchases | `setSchedulePaused` | Blocks or allows purchases for this schedule |
| Withdraw principal | `withdrawToken` | Returns stablecoin principal |
| Delete | `deleteDcaSchedule` | Returns remaining principal and retires the id |

`deleteDcaSchedule` also takes the current index of that id in your list for the token. Read the list, then submit the index that contains the id. A delete moves another id into the freed list slot. Use the id, not an old list position.

## Pause

A schedule pause blocks purchases for that schedule. A deposit pause blocks new deposits for one token and one route. That pause is an owner setting on the pair.

Neither pause blocks a withdrawal, a delete, an rBTC claim, or an edit. The protected purchase window is the exception for some of those calls. Website data never blocks a user exit. You exit by calling the contract from your account.

## Protected purchase window

A swapper can open a window of five blocks. From the activation block through the next four blocks, the contract refuses these calls:

- a purchase-amount edit
- a cadence edit
- a schedule pause edit
- a delete
- a principal withdrawal
- a principal-and-interest withdrawal
- a bulk interest withdrawal

Those calls are available again on the fifth following block. An rBTC claim stays available during the window. A new deposit stays available during the window, unless a deposit pause applies to that token and route.

## Delete

A delete returns remaining principal to you. It does not claim interest. It does not claim accumulated rBTC. Claim rBTC in a separate call. On a lending route, withdraw interest in a separate call if you want that stablecoin.

The deleted-schedule event reports the amount the handler paid. That amount can be lower than the stored principal if the handler pays less than the request.

## Several schedules

You can hold more than one schedule for the same stablecoin, up to the owner cap. Each schedule has its own balance, purchase amount, cadence, anchor, pause flag, and route. rBTC from schedules on the same token and route is stored together in that handler.

## Read next

- [Claim rBTC](/docs/user-guide/withdraw-rbtc)
- [Lending and idle balances](/docs/user-guide/earning-yield)
- [FAQ](/docs/resources/faq)
