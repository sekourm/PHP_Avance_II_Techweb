<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * techProjects
 */
class techProjects
{
    /**
     * @var int
     */
    private $id;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }
    /**
     * @var string
     */
    private $name;

    /**
     * @var boolean
     */
    private $active = 1;

    /**
     * @var \DateTime
     */
    private $createdAt;

    /**
     * @var \DateTime
     */
    private $updatedAt;

    /**
     * @var \AppBundle\Entity\techUsers
     */
    private $projectsUsers;


    /**
     * Set name
     *
     * @param string $name
     * @return techProjects
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set active
     *
     * @param boolean $active
     * @return techProjects
     */
    public function setActive($active)
    {
        $this->active = $active;

        return $this;
    }

    /**
     * Get active
     *
     * @return boolean 
     */
    public function getActive()
    {
        return $this->active;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     * @return techProjects
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Get createdAt
     *
     * @return \DateTime 
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set updatedAt
     *
     * @param \DateTime $updatedAt
     * @return techProjects
     */
    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * Get updatedAt
     *
     * @return \DateTime 
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    /**
     * Set projectsUsers
     *
     * @param \AppBundle\Entity\techUsers $projectsUsers
     * @return techProjects
     */
    public function setProjectsUsers(\AppBundle\Entity\techUsers $projectsUsers = null)
    {
        $this->projectsUsers = $projectsUsers;

        return $this;
    }

    /**
     * Get projectsUsers
     *
     * @return \AppBundle\Entity\techUsers 
     */
    public function getProjectsUsers()
    {
        return $this->projectsUsers;
    }
    /**
     * @var \Doctrine\Common\Collections\Collection
     */
    private $usersByProjects;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->usersByProjects = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add usersByProjects
     *
     * @param \AppBundle\Entity\techProjectsByUsers $usersByProjects
     * @return techProjects
     */
    public function addUsersByProject(\AppBundle\Entity\techProjectsByUsers $usersByProjects)
    {
        $this->usersByProjects[] = $usersByProjects;

        return $this;
    }

    /**
     * Remove usersByProjects
     *
     * @param \AppBundle\Entity\techProjectsByUsers $usersByProjects
     */
    public function removeUsersByProject(\AppBundle\Entity\techProjectsByUsers $usersByProjects)
    {
        $this->usersByProjects->removeElement($usersByProjects);
    }

    /**
     * Get usersByProjects
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getUsersByProjects()
    {
        return $this->usersByProjects;
    }
    /**
     * @var \Doctrine\Common\Collections\Collection
     */
    private $categoriesByProjects;


    /**
     * Add categoriesByProjects
     *
     * @param \AppBundle\Entity\techCategories $categoriesByProjects
     * @return techProjects
     */
    public function addCategoriesByProject(\AppBundle\Entity\techCategories $categoriesByProjects)
    {
        $this->categoriesByProjects[] = $categoriesByProjects;

        return $this;
    }

    /**
     * Remove categoriesByProjects
     *
     * @param \AppBundle\Entity\techCategories $categoriesByProjects
     */
    public function removeCategoriesByProject(\AppBundle\Entity\techCategories $categoriesByProjects)
    {
        $this->categoriesByProjects->removeElement($categoriesByProjects);
    }

    /**
     * Get categoriesByProjects
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getCategoriesByProjects()
    {
        return $this->categoriesByProjects;
    }

    public function insertCreatedAtAuto()
    {
        return $this->setCreatedAt(new \DateTime());
    }

    public function insertUpdateAtAuto()
    {
        return $this->setUpdatedAt(new \DateTime());
    }
}
